import { forwardRef, Module } from '@nestjs/common';

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

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
import {
  CreateTenantStatusController,
  DeleteTenantStatusController,
  FindByIdTenantStatusController,
  ListTenantStatusController,
  UpdateTenantStatusController,
} from './infra/http/controllers';

@Module({
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
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
