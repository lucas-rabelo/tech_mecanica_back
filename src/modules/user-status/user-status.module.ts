import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import { FindUserStatusInUsersService } from './application/services';
import {
  CreateUserStatusUseCase,
  DeleteUserStatusUseCase,
  FindByIdUserStatusUseCase,
  ListAllUserStatusUseCase,
  UpdateUserStatusUseCase,
} from './application/use-cases';
import {
  CreateUserStatusController,
  DeleteUserStatusController,
  FindByIdUserStatusController,
  ListAllUserStatusController,
  UpdateUserStatusController,
  UserStatusPrismaRepository,
  UserStatusRepository,
} from './infra';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  providers: [
    CreateUserStatusUseCase,
    DeleteUserStatusUseCase,
    FindByIdUserStatusUseCase,
    UpdateUserStatusUseCase,
    ListAllUserStatusUseCase,
    FindUserStatusInUsersService,
    {
      provide: UserStatusRepository,
      useClass: UserStatusPrismaRepository,
    },
  ],
  controllers: [
    CreateUserStatusController,
    DeleteUserStatusController,
    FindByIdUserStatusController,
    ListAllUserStatusController,
    UpdateUserStatusController,
  ],
})
export class UserStatusModule {}
