import { PermissionsEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import {
  PermissionRepositoryTypeOrm,
  PermissionsRepository,
} from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionsEntity])],
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
