import { forwardRef, Module } from '@nestjs/common';

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

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  PermissionModuleRepositoryTypeOrm,
  PermissionModulesRepository,
} from './infra/http/database';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
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
