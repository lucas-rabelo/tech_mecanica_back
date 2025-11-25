import { UsersEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindByIdUserUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
} from './application/use-cases';
import {
  CreateUserController,
  DeleteUserController,
  FindByIdUserController,
  ListUserController,
  UpdateUserController,
} from './infra/http/controllers';
import { UsersRepository, UsersRepositoryTypeOrm } from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  controllers: [
    CreateUserController,
    DeleteUserController,
    FindByIdUserController,
    ListUserController,
    UpdateUserController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindByIdUserUseCase,
    ListUserUseCase,
    UpdateUserUseCase,
    {
      provide: UsersRepository,
      useClass: UsersRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class UsersModule {}
