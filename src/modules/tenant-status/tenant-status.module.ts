import { PrismaModule } from '@/src/infra/config';
import { Module } from '@nestjs/common';
import { TenantsModule } from '../tenants';
import { FindTenantStatusInTenantService } from './application/services';
import {
  CreateTenantStatusUseCase,
  DeleteTenantStatusUseCase,
  FindByIdTenantStatusUseCase,
  ListTenantStatusUseCase,
  UpdateTenantStatusUseCase,
} from './application/use-cases';
import {
  CreateTenantStatusController,
  DeleteTenantStatusController,
  FindByIdStatusController,
  ListTenantStatusController,
  UpdateStatusController,
} from './infra/http/controllers';
import {
  TenantStatusPrismaRespository,
  TenantStatusRepository,
} from './infra/http/database';

@Module({
  imports: [PrismaModule, TenantsModule],
  controllers: [
    CreateTenantStatusController,
    DeleteTenantStatusController,
    FindByIdStatusController,
    ListTenantStatusController,
    UpdateStatusController,
  ],
  providers: [
    CreateTenantStatusUseCase,
    DeleteTenantStatusUseCase,
    FindByIdTenantStatusUseCase,
    ListTenantStatusUseCase,
    UpdateTenantStatusUseCase,
    FindTenantStatusInTenantService,
    {
      provide: TenantStatusRepository,
      useClass: TenantStatusPrismaRespository,
    },
  ],
})
export class TenantStatusModule {}
