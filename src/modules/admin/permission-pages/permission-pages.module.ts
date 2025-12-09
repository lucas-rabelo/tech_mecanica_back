import { forwardRef, Module } from '@nestjs/common';

import {
  CreatePermissionPageUseCase,
  DeletePermissionPageUseCase,
  FindByIdPermissionPageUseCase,
  ListPermissionPageUseCase,
  UpdatePermissionPageUseCase,
} from './application/use-cases';

import {
  CreatePermissionPageController,
  DeletePermissionPageController,
  FindByIdPermissionPageController,
  ListPermissionPageController,
  UpdatePermissionPageController,
} from './infra/http/controllers';

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  PermissionPageRepositoryTypeOrm,
  PermissionPagesRepository,
} from './infra/http/database';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [
    CreatePermissionPageController,
    DeletePermissionPageController,
    FindByIdPermissionPageController,
    ListPermissionPageController,
    UpdatePermissionPageController,
  ],
  providers: [
    CreatePermissionPageUseCase,
    DeletePermissionPageUseCase,
    FindByIdPermissionPageUseCase,
    ListPermissionPageUseCase,
    UpdatePermissionPageUseCase,
    {
      provide: PermissionPagesRepository,
      useClass: PermissionPageRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class PermissionPagesModule {}
