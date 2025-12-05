import { TenantStatusEntity } from '@/src/infra';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CreateTenantStatusUseCase,
  DeleteTenantStatusUseCase,
  FindByIdTenantStatusUseCase,
  ListTenantStatusUseCase,
  UpdateTenantStatusUseCase,
} from './application/use-cases';

import {
  TenantStatusRepository,
  TenantStatusRepositoryTypeOrm,
} from './infra/http/database';

import {
  CreateTenantStatusController,
  DeleteTenantStatusController,
  FindByIdTenantStatusController,
  ListTenantStatusController,
  UpdateTenantStatusController,
} from './infra/http/controllers';

@Module({
  imports: [TypeOrmModule.forFeature([TenantStatusEntity])],
  controllers: [
    CreateTenantStatusController,
    DeleteTenantStatusController,
    FindByIdTenantStatusController,
    ListTenantStatusController,
    UpdateTenantStatusController,
  ],
  providers: [
    CreateTenantStatusUseCase,
    DeleteTenantStatusUseCase,
    FindByIdTenantStatusUseCase,
    ListTenantStatusUseCase,
    UpdateTenantStatusUseCase,
    {
      provide: TenantStatusRepository,
      useClass: TenantStatusRepositoryTypeOrm,
    },
  ],
  exports: [],
})
export class TenantStatusModule {}
