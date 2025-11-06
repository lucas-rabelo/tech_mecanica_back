import { FindByIdUserUseCase } from '@/src/modules/users';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
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
    const { authorization } = request.headers;

    try {
      const token = (authorization ?? '').split(' ')[1];

      const data = this.jwtService.verify(token);

      if (!data) {
        throw new Error();
      }

      const user = await this.findByIdUserUseCase.execute(data.id);

      if (user.userStatus === 'Inativo') {
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
