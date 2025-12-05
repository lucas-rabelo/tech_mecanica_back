import { ADMIN_USER_ID } from '@/src/core';
import { FindUserAuthResponseDto } from '@/src/modules';
import { ValidateTokenJwtService } from '../../modules/admin/auth/application/services/validate-token-jwt.service';
import { LoginAuthUseCase } from '../../modules/admin/auth/application/use-cases/login-auth.useCase';
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
    private readonly loginAuthUseCase: LoginAuthUseCase,
    private readonly validateTokenJwtService: ValidateTokenJwtService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      const host = req.hostname;
      const subdomain = host.split('.')[0];

      const tenant = await this.tenantsRepository.findOne({
        where: { subdomain },
      });

      let token: string | null = null; 
      let data: FindUserAuthResponseDto | null = null;
      if (!tenant) {
        token = req.headers['authorization']?.split(' ')[1] ?? null;

        if (!token) {
          const { email, password } = req.body;
          token = (await this.loginAuthUseCase.execute({ email, password })).access_token;
        }
        
        data = await this.validateTokenJwtService.execute(token, {});

        if (!data || data.id !== ADMIN_USER_ID) {
          throw Error();
        }
      }

      (req as any).tenantId = tenant?.id;
      (req as any).tenant = tenant;
      (req as any).token = token;
      (req as any).user = data;


      next();
    } catch (error) {
      throw new NotFoundException(
        'Não foi possível fazer login, entre em contato com o suporte.',
      );
    }
  }
}
