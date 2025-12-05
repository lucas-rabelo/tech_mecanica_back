import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users';

import {
  ComparePasswordService,
  CreateTokenJwtService,
  EncryptedPasswordService,
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
import { AuthGuard } from '@/src/infra';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET_ENV,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UsersModule),
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
    EncryptedPasswordService,
    ForgotPasswordAuthUseCase,
    LoginAuthUseCase,
    RegisterAuthUseCase,
    ResetPasswordAuthUseCase,
  ],
  exports: [
    ComparePasswordService,
    ValidateTokenJwtService,
    CreateTokenJwtService,
    EncryptedPasswordService,
    LoginAuthUseCase,
  ],
})
export class AuthModule {}
