import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users';
import {
  ComparePasswordAuthService,
  CreateTokenJwtAuthService,
  EncryptPasswordAuthService,
  ValidateTokenJwtAuthService,
} from './application/services';
import {
  ForgetPasswordAuthUseCase,
  LoginAuthUseCase,
  RegisterAuthUseCase,
  ResetPasswordAuthUseCase,
} from './application/use-cases';
import {
  ForgetPasswordAuthController,
  LoginAuthController,
  RegisterAuthController,
  ResetPasswordAuthController,
} from './infra/http/controllers';
import { AuthPrismaRepository, AuthRepository } from './infra/http/database';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_ENV}`,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    ForgetPasswordAuthController,
    LoginAuthController,
    RegisterAuthController,
    ResetPasswordAuthController,
  ],
  providers: [
    ComparePasswordAuthService,
    CreateTokenJwtAuthService,
    EncryptPasswordAuthService,
    ValidateTokenJwtAuthService,
    ForgetPasswordAuthUseCase,
    LoginAuthUseCase,
    RegisterAuthUseCase,
    ResetPasswordAuthUseCase,
    {
      provide: AuthRepository,
      useClass: AuthPrismaRepository,
    },
  ],
  exports: [
    ComparePasswordAuthService,
    CreateTokenJwtAuthService,
    EncryptPasswordAuthService,
    ValidateTokenJwtAuthService,
  ],
})
export class AuthModule {}
