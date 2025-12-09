import { forwardRef, Module } from '@nestjs/common';

import {
  CreateModuleUseCase,
  DeleteModuleUseCase,
  FindByIdModuleUseCase,
  ListModuleUseCase,
  UpdateModuleUseCase,
} from './application/use-cases';

import {
  CreateModuleController,
  DeleteModuleController,
  FindByIdModuleController,
  ListModuleController,
  UpdateModuleController,
} from './infra/http/controllers';

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  ModuleRepositoryTypeOrm,
  ModulesRepository,
} from './infra/http/database';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
  controllers: [
    CreateModuleController,
    DeleteModuleController,
    FindByIdModuleController,
    ListModuleController,
    UpdateModuleController,
  ],
  providers: [
    CreateModuleUseCase,
    DeleteModuleUseCase,
    FindByIdModuleUseCase,
    ListModuleUseCase,
    UpdateModuleUseCase,
    {
      provide: ModulesRepository,
      useClass: ModuleRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class ModulesModule {}
