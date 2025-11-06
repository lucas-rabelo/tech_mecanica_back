import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;
    const subdomain = host.split('.')[0];

    if (!subdomain || ['www', 'app'].includes(subdomain)) {
      return next();
    }

    const tenant = await this.prisma.tenant.findUnique({
      where: { subdomain },
    });

    if (!tenant) {
      throw new NotFoundException('Não foi possível fazer login, entre em contato com o suporte.');
    }

    (req as any).tenantId = tenant.id;
    (req as any).tenant = tenant;

    next();
  }
}
