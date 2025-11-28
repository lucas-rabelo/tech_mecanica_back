import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { TenantsEntity } from '../database';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(TenantsEntity)
    private readonly tenantsRepository: Repository<TenantsEntity>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const host = req.hostname;
    const subdomain = host.split('.')[0];

    if (!subdomain || ['www', 'app'].includes(subdomain)) {
      return next();
    }

    const tenant = await this.tenantsRepository.findOne({
      where: { subdomain },
    });

    if (!tenant) {
      throw new NotFoundException(
        'Não foi possível fazer login, entre em contato com o suporte.',
      );
    }

    (req as any).tenantId = tenant.id;
    (req as any).tenant = tenant;

    next();
  }
}
