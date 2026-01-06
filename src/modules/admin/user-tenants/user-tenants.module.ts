import { forwardRef, Module } from '@nestjs/common';

import {
  CreateUserTenantsUseCase,
  DeleteUserTenantsUseCase,
  FindByIdUserTenantsUseCase,
  ListUserTenantsUseCase,
  UpdateUserTenantsUseCase,
} from './application/use-cases';

import {
  UserTenantsRepository,
  UserTenantsRepositoryTypeOrm,
} from './infra/http/database';

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  CreateUserTenantsController,
  DeleteUserTenantsController,
  FindByIdUserTenantsController,
  ListUserTenantsController,
  UpdateUserTenantsController,
} from './infra/http/controllers';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [
    CreateUserTenantsController,
    DeleteUserTenantsController,
    FindByIdUserTenantsController,
    ListUserTenantsController,
    UpdateUserTenantsController,
  ],
  providers: [
    CreateUserTenantsUseCase,
    DeleteUserTenantsUseCase,
    FindByIdUserTenantsUseCase,
    ListUserTenantsUseCase,
    UpdateUserTenantsUseCase,
    {
      provide: UserTenantsRepository,
      useClass: UserTenantsRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class UserTenantsModule {}
