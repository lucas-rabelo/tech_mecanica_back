import { PermissionModulesEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreatePermissionModuleUseCase,
  DeletePermissionModuleUseCase,
  FindByIdPermissionModuleUseCase,
  ListPermissionModuleUseCase,
  UpdatePermissionModuleUseCase,
} from './application/use-cases';

import {
  CreatePermissionModuleController,
  DeletePermissionModuleController,
  FindByIdPermissionModuleController,
  ListPermissionModuleController,
  UpdatePermissionModuleController,
} from './infra/http/controllers';

import {
  PermissionModuleRepositoryTypeOrm,
  PermissionModulesRepository,
} from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionModulesEntity])],
  controllers: [
    CreatePermissionModuleController,
    DeletePermissionModuleController,
    FindByIdPermissionModuleController,
    ListPermissionModuleController,
    UpdatePermissionModuleController,
  ],
  providers: [
    CreatePermissionModuleUseCase,
    DeletePermissionModuleUseCase,
    FindByIdPermissionModuleUseCase,
    ListPermissionModuleUseCase,
    UpdatePermissionModuleUseCase,
    {
      provide: PermissionModulesRepository,
      useClass: PermissionModuleRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class PermissionModulesModule {}
