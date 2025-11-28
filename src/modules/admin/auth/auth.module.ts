import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users';

import {
  ComparePasswordService,
  CreateTokenJwtService,
  EncryptPasswordService,
  ValidateTokenJwtService,
} from './application/services';

import {
  ForgotPasswordAuthUseCase,
  LoginAuthUseCase,
  RegisterAuthUseCase,
  ResetPasswordAuthUseCase,
} from './application/use-cases';

import {
  ForgotPasswordAuthController,
  LoginAuthController,
  RegisterAuthController,
  ResetPasswordAuthController,
} from './infra';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: `${process.env.SECRET_ENV}`,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [
    ForgotPasswordAuthController,
    LoginAuthController,
    RegisterAuthController,
    ResetPasswordAuthController,
  ],
  providers: [
    ComparePasswordService,
    ValidateTokenJwtService,
    CreateTokenJwtService,
    EncryptPasswordService,
    ForgotPasswordAuthUseCase,
    LoginAuthUseCase,
    RegisterAuthUseCase,
    ResetPasswordAuthUseCase,
  ],
  exports: [
    ComparePasswordService,
    ValidateTokenJwtService,
    CreateTokenJwtService,
    EncryptPasswordService,
  ],
})
export class AuthModule {}
