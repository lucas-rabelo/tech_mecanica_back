import { ADMIN_USER_ID, USER_STATUS_ID_INACTIVE } from '@/src/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { FindByIdUserUseCase } from '../../modules/admin/users/application/use-cases/find-by-id-user-use-case';
import { IS_PUBLIC_KEY } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization, tenantId } = request.headers;

    try {
      const token = (authorization ?? '').split(' ')[1];

      const data = await this.jwtService.verifyAsync(token, {});

      if (!data) {
        throw new Error();
      }

      const user = await this.findByIdUserUseCase.execute({
        id: data.id,
        isAdmin: Boolean(data.id === ADMIN_USER_ID),
        tenantId,
      });

      if (user.userStatus.id === USER_STATUS_ID_INACTIVE) {
        throw new Error();
      }

      request.token = token;
      request.user = user;

      return true;
    } catch (e) {
      return false;
    }
  }
}
