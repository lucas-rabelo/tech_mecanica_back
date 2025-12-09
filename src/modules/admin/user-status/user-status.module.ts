import { forwardRef, Module } from '@nestjs/common';

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

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  CreateUserStatusController,
  DeleteUserStatusController,
  FindByIdUserStatusController,
  ListUserStatusController,
  UpdateUserStatusController,
} from './infra/http/controllers';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [
    CreateUserStatusController,
    DeleteUserStatusController,
    FindByIdUserStatusController,
    ListUserStatusController,
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
