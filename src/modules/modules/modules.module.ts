import { PrismaModule } from '@/src/infra/config';
import { forwardRef, Module } from '@nestjs/common';
import {
  CreateModuleUseCase,
  DeleteModuleUseCase,
  FindByIdModuleUseCase,
  ListModuleUseCase,
  UpdateModuleUseCase,
} from './application/use-cases';
import {
  CreateModulesController,
  DeleteModulesController,
  FindByIdModulesController,
  ListModulesController,
  UpdateModulesController,
} from './infra/http/controllers';
import {
  ModulePrismaRepository,
  ModuleRepository,
} from './infra/http/database';
import { PermissionModulesModule } from '../permission-modules';

@Module({
  imports: [PrismaModule, forwardRef(() => PermissionModulesModule)],
  controllers: [
    CreateModulesController,
    DeleteModulesController,
    FindByIdModulesController,
    ListModulesController,
    UpdateModulesController,
  ],
  providers: [
    CreateModuleUseCase,
    DeleteModuleUseCase,
    FindByIdModuleUseCase,
    ListModuleUseCase,
    UpdateModuleUseCase,
    {
      provide: ModuleRepository,
      useClass: ModulePrismaRepository,
    },
  ],
})
export class ModulesModule {}
