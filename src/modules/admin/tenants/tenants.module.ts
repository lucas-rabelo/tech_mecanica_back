import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth';
import { UsersModule } from '../users';
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
  imports: [forwardRef(() => AuthModule), forwardRef(() => UsersModule)],
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
