import { forwardRef, Module } from '@nestjs/common';

import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  FindByIdPermissionUseCase,
  ListPermissionUseCase,
  UpdatePermissionUseCase,
} from './application/use-cases';

import {
  CreatePermissionController,
  DeletePermissionController,
  FindByIdPermissionController,
  ListPermissionController,
  UpdatePermissionController,
} from './infra/http/controllers';

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  PermissionRepositoryTypeOrm,
  PermissionsRepository,
} from './infra/http/database';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [
    CreatePermissionController,
    DeletePermissionController,
    FindByIdPermissionController,
    ListPermissionController,
    UpdatePermissionController,
  ],
  providers: [
    CreatePermissionUseCase,
    DeletePermissionUseCase,
    FindByIdPermissionUseCase,
    ListPermissionUseCase,
    UpdatePermissionUseCase,
    {
      provide: PermissionsRepository,
      useClass: PermissionRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class PermissionsModule {}
