import { UsersEntity } from '@/src/infra';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth';
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
  imports: [
    JwtModule.register({
      secret: `${process.env.SECRET_ENV}`,
    }),
    TypeOrmModule.forFeature([UsersEntity]),
    forwardRef(() => AuthModule),
  ],
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
  exports: [UsersRepository, FindByIdUserUseCase],
})
export class UsersModule {}
