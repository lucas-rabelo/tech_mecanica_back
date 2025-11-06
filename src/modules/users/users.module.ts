import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindByIdUserUseCase,
  FindByUserStatusIdUseCase,
  ListUserUseCase,
  UpdateUserUseCase,
} from './application/use-cases';
import {
  CreateUsersController,
  DeleteUsersController,
  FindByIdUsersController,
  ListUsersController,
  UpdateUsersController,
} from './infra/http/controllers';
import { UsersPrismaRepository, UsersRepository } from './infra/http/database';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [
    CreateUsersController,
    DeleteUsersController,
    FindByIdUsersController,
    ListUsersController,
    UpdateUsersController,
  ],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    FindByIdUserUseCase,
    FindByUserStatusIdUseCase,
    ListUserUseCase,
    UpdateUserUseCase,
    {
      provide: UsersRepository,
      useClass: UsersPrismaRepository,
    },
  ],
  exports: [FindByUserStatusIdUseCase, FindByIdUserUseCase],
})
export class UsersModule {}
