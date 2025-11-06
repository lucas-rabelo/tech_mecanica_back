import { PrismaModule } from '@/src/infra/config';
import { Module } from '@nestjs/common';
import {
  CreateTenantUseCase,
  DeleteTenantUseCase,
  FindByIdTenantUseCase,
  FindByTenantStatusIdTenantUseCase,
  ListTenantUseCase,
  UpdateTenantUseCase,
} from './application/use-cases';
import { TenantsPrismaRepository, TenantsRepository } from './infra';
import {
  CreateTenantsController,
  DeleteTenantsController,
  FindByIdTenantsController,
  ListTenantsController,
  UpdateTenantsController,
} from './infra/http/controllers';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreateTenantsController,
    DeleteTenantsController,
    FindByIdTenantsController,
    ListTenantsController,
    UpdateTenantsController,
  ],
  providers: [
    CreateTenantUseCase,
    DeleteTenantUseCase,
    FindByIdTenantUseCase,
    ListTenantUseCase,
    UpdateTenantUseCase,
    FindByTenantStatusIdTenantUseCase,
    {
      provide: TenantsRepository,
      useClass: TenantsPrismaRepository,
    },
  ],
  exports: [FindByTenantStatusIdTenantUseCase],
})
export class TenantsModule {}
