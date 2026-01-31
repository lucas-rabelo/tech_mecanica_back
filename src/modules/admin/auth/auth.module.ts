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
  IdentifyAuthUseCase,
  LoginAuthUseCase,
  RegisterAuthUseCase,
  ResetPasswordAuthUseCase,
} from './application/use-cases';

import { DatabaseModule } from '@/src/infra';
import { SharedJwtModule } from '../../shared';
import { UserTenantsModule } from '../user-tenants';
import {
  ForgotPasswordAuthController,
  IdentifyAuthController,
  LoginAuthController,
  RegisterAuthController,
  ResetPasswordAuthController,
} from './infra';

@Module({
  imports: [
    DatabaseModule,
    SharedJwtModule,
    forwardRef(() => UsersModule),
    UserTenantsModule,
  ],
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
