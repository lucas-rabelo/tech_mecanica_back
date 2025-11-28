import { TenantsEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateTenantUseCase,
  DeleteTenantUseCase,
  FindByIdTenantUseCase,
  ListTenantUseCase,
  UpdateTenantUseCase,
} from './application/use-cases';
import {
  CreateTenantController,
  DeleteTenantController,
  FindByIdTenantController,
  ListTenantController,
  UpdateTenantController,
} from './infra/http/controllers';
import {
  TenantsRepository,
  TenantsRepositoryTypeOrm,
} from './infra/http/database';

@Module({
  imports: [TypeOrmModule.forFeature([TenantsEntity])],
  controllers: [
    CreateTenantController,
    DeleteTenantController,
    FindByIdTenantController,
    ListTenantController,
    UpdateTenantController,
  ],
  providers: [
    CreateTenantUseCase,
    DeleteTenantUseCase,
    FindByIdTenantUseCase,
    ListTenantUseCase,
    UpdateTenantUseCase,
    {
      provide: TenantsRepository,
      useClass: TenantsRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class TenantsModule {}
