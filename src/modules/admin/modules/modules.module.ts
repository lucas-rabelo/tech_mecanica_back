import { ModulesEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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

import {
  ModuleRepositoryTypeOrm,
  ModulesRepository,
} from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([ModulesEntity])],
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
