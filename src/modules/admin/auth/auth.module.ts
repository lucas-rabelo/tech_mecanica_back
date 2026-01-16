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
  IdentifyAuthUseCase
} from './application/use-cases';

import { DatabaseModule } from '@/src/infra';
import { SharedJwtModule } from '../../shared';
import {
  ForgotPasswordAuthController,
  LoginAuthController,
  RegisterAuthController,
  ResetPasswordAuthController,
  IdentifyAuthController
} from './infra';

@Module({
  imports: [DatabaseModule, SharedJwtModule, forwardRef(() => UsersModule)],
  controllers: [
    ForgotPasswordAuthController,
    LoginAuthController,
    RegisterAuthController,
    ResetPasswordAuthController,
    IdentifyAuthController,
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
    IdentifyAuthUseCase,
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
