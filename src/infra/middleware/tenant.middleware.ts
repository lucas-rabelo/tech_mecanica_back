import { ADMIN_USER_ID, RequestContextService } from '@/src/core';
import { FindUserAuthResponseDto } from '@/src/modules';
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Repository } from 'typeorm';
import { ValidateTokenJwtService } from '../../modules/admin/auth/application/services/validate-token-jwt.service';
import { LoginAuthUseCase } from '../../modules/admin/auth/application/use-cases/login-auth.useCase';
import { TenantsEntity } from '../database';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(TenantsEntity)
    private readonly tenantsRepository: Repository<TenantsEntity>,
    private readonly loginAuthUseCase: LoginAuthUseCase,
    private readonly validateTokenJwtService: ValidateTokenJwtService,
    private readonly requestContextService: RequestContextService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    try {
      const host = req.hostname;
      const subdomain = host.split('.')[0];

      const tenant = await this.tenantsRepository.findOne({
        where: { subdomain },
      });

      let token: string | null =
        req.headers['authorization']?.split(' ')[1] ?? null;
      let data: FindUserAuthResponseDto | null = null;
      if (!tenant) {
        data = await this.getUserData(req, token);

        if (!data || data.id !== ADMIN_USER_ID) {
          throw Error();
        }

        req.user = data;
      }

      data = await this.getUserData(req, token);

      if (!data) {
        throw Error();
      }

      req.user = data;
      req.tenantId = tenant?.id;
      req.tenant = tenant;
      req.token = token;

      this.requestContextService.run(
        { tenantId: req.tenantId, userId: req.user.id },
        async () => {
          next();
        },
      );
    } catch (error) {
      throw new NotFoundException(
        'We were unable to log in, please contact support.',
      );
    }
  }

  async getUserData(
    req: Request,
    token: string | null,
  ): Promise<FindUserAuthResponseDto | null> {
    let newToken: string | null = token;
    if (!newToken) {
      const { email, password } = req.body;
      newToken = (await this.loginAuthUseCase.execute({ email, password }))
        .access_token;
    }

    return await this.validateTokenJwtService.execute(newToken, {});
  }
}
