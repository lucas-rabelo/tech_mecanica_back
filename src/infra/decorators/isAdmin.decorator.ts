import { ADMIN_USER_ID } from '@/src/core';
import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';

export const IsAdmin = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      return Boolean(request.user.id === ADMIN_USER_ID);
    } else {
      throw new NotFoundException(
        'User not founded in request. Use the AuthGuard to get the user.',
      );
    }
  },
);
