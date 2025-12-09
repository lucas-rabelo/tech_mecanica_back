import { PermissionPagesEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import {
  PermissionPageRepositoryTypeOrm,
  PermissionPagesRepository,
} from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionPagesEntity])],
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
