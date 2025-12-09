import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { ACCESS_KEY } from '../constants';
import { PermissionModulesEntity, PermissionPagesEntity } from '../database';
import { AccessRequirement } from '../decorators/required-access.decorator';
import type { CachedAccess } from '../types';

@Injectable()
export class AccessGuard implements CanActivate {
  private cache = new Map<number, CachedAccess>();
  private CACHE_TTL = 1000 * 60 * 10;

  constructor(
    private reflector: Reflector,
    @InjectRepository(PermissionModulesEntity)
    private readonly permissionModulesRepository: Repository<PermissionModulesEntity>,
    @InjectRepository(PermissionPagesEntity)
    private readonly permissionPagesRepository: Repository<PermissionPagesEntity>,
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

    if (user.userStatus === 'Inativo')
      throw new ForbiddenException('Acesso negado a esse usuário');

    const { module: moduleName, page: pageName } = access;

    if(!user.permission) {
      throw new ForbiddenException(
        'You do not have permission to access this page.',
      );
    }

    const cached = await this.getCachedAccess(user.permission.id);

    if (moduleName && pageName) {
      const hasModuleAccess = cached.modules.has(moduleName);
      const hasPageAccess = cached.pages.has(pageName);

      if (!hasModuleAccess && !hasPageAccess) {
        throw new ForbiddenException(
          'You do not have permission to access this page.',
        );
      }
    }

    return true;
  }

  private async getCachedAccess(permissionId: number): Promise<CachedAccess> {
    const cached = this.cache.get(permissionId);

    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached;
    }

    const permissionModules = await this.permissionModulesRepository.find({
      where: { permissionId },
      relations: {
        modules: {
          pages: true,
        },
      },
    });

    const permissionPages = await this.permissionPagesRepository.find({
      where: { permissionId },
      relations: { pages: true },
    });

    const modules = new Set<string>();
    const pages = new Set<string>();

    for (const pm of permissionModules) {
      if (pm.modules?.name) modules.add(pm.modules.name);

      for (const page of pm.modules?.pages ?? []) {
        if (page.name) pages.add(page.name);
      }
    }

    for (const pp of permissionPages) {
      if (pp.pages?.name) pages.add(pp.pages.name);
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
