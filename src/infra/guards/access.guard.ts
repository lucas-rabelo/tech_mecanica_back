import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../config';
import { ACCESS_KEY } from '../constants';
import { AccessRequirement } from '../decorators/required-access.decorator';

type CachedAccess = {
  modules: Set<string>;
  pages: Set<string>;
  timestamp: number;
};

@Injectable()
export class AccessGuard implements CanActivate {
  private cache = new Map<number, CachedAccess>();
  private CACHE_TTL = 1000 * 60 * 10;
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const access = this.reflector.get<AccessRequirement>(
      ACCESS_KEY,
      context.getHandler(),
    );

    if (!access) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) throw new ForbiddenException('Usuário não autenticado');

    if(user.userStatus === 'Inativo') throw new ForbiddenException('Acesso negado a esse usuário'); 

    const { module: moduleName, page: pageName } = access;

    const cached = await this.getCachedAccess(user.permissionId);

    if (moduleName && !cached.modules.has(moduleName))
      throw new ForbiddenException(`Acesso negado ao módulo ${moduleName}`);

    if (pageName && !cached.pages.has(pageName))
      throw new ForbiddenException(`Acesso negado à página ${pageName}`);

    return true;
  }

  private async getCachedAccess(permissionId: number): Promise<CachedAccess> {
    const cached = this.cache.get(permissionId);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached;
    }

    const permissionModules = await this.prisma.permissionModule.findMany({
      where: { permissionId },
      include: {
        module: {
          include: { pages: true },
        },
      },
    });

    const permissionPages = await this.prisma.permissionPage.findMany({
      where: { permissionId },
      include: { page: true },
    });

    const modules = new Set<string>();
    const pages = new Set<string>();

    for (const pm of permissionModules) {
      if (pm.module?.name) modules.add(pm.module.name);

      for (const page of pm.module?.pages ?? []) {
        if (page.name) pages.add(page.name);
      }
    }

    for (const pp of permissionPages) {
      if (pp.page?.name) pages.add(pp.page.name);
    }

    const access: CachedAccess = {
      modules,
      pages,
      timestamp: Date.now(),
    };

    this.cache.set(permissionId, access);

    return access;
  }
}
