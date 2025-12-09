import { forwardRef, Module } from '@nestjs/common';
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

import { DatabaseModule } from '@/src/infra';
import { SharedJwtModule } from '../../shared';
import {
  ForgotPasswordAuthController,
  LoginAuthController,
  RegisterAuthController,
  ResetPasswordAuthController,
} from './infra';

@Module({
  imports: [DatabaseModule, SharedJwtModule, forwardRef(() => UsersModule)],
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
    SharedJwtModule,
    DatabaseModule,
  ],
})
export class AuthModule {}
