import { PrismaModule } from '@/src/infra/config';
import { Module } from '@nestjs/common';
import { FindModuleInPermissionModulesService } from './application/services';
import {
  CreatePermissionModuleUseCase,
  DeletePermissionModuleUseCase,
  FindByIdPermissionModulesUseCase,
  ListPermissionModuleUseCase,
  UpdatePermissionModuleUseCase,
} from './application/use-cases';
import {
  CreatePermissionModulesController,
  DeletePermissionModulesController,
  FindByIdPermissionModulesController,
  ListPermissionModulesController,
  UpdatePermissionModulesController,
} from './infra/http/controllers';
import { PermissionModulesPrismaRepository } from './infra/http/database';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreatePermissionModulesController,
    DeletePermissionModulesController,
    FindByIdPermissionModulesController,
    ListPermissionModulesController,
    UpdatePermissionModulesController,
  ],
  providers: [
    FindModuleInPermissionModulesService,
    CreatePermissionModuleUseCase,
    DeletePermissionModuleUseCase,
    FindByIdPermissionModulesUseCase,
    ListPermissionModuleUseCase,
    UpdatePermissionModuleUseCase,

    {
      provide: 'PermissionModulesRepository',
      useClass: PermissionModulesPrismaRepository,
    },
  ],
  exports: [FindModuleInPermissionModulesService],
})
export class PermissionModulesModule {}
