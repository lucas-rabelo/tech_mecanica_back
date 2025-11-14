import { UserStatusEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateUserStatusUseCase,
  DeleteUserStatusUseCase,
  FindByIdUserStatusUseCase,
  ListUserStatusUseCase,
  UpdateUserStatusUseCase,
} from './application/use-cases';

import {
  UserStatusRepository,
  UserStatusRepositoryTypeOrm,
} from './infra/http/database';

import {
  CreateUserStatusController,
  DeleteUserStatusController,
  FindByIdUserStatusController,
  ListPermissionController,
  UpdateUserStatusController,
} from './infra/http/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatusEntity])],
  controllers: [
    CreateUserStatusController,
    DeleteUserStatusController,
    FindByIdUserStatusController,
    ListPermissionController,
    UpdateUserStatusController,
  ],
  providers: [
    CreateUserStatusUseCase,
    DeleteUserStatusUseCase,
    FindByIdUserStatusUseCase,
    ListUserStatusUseCase,
    UpdateUserStatusUseCase,
    {
      provide: UserStatusRepository,
      useClass: UserStatusRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class UserStatusModule {}
