import { Module } from '@nestjs/common';
import { PrismaModule } from '@/src/infra/config';
import {
  CreatePermissionController,
  DeletePermissionController,
  FindByIdPermissionController,
  ListPermissionController,
  PermissionsPrismaRepository,
  PermissionsRepository,
  UpdatePermissionController,
} from './infra';
import {
  CreatePermissionsUseCase,
  DeletePermissionsUseCase,
  FindByIdPermissionsUseCase,
  ListPermissionsUseCase,
  UpdatePermissionsUseCase,
} from './application/use-cases';

@Module({
  imports: [PrismaModule],
  controllers: [
    CreatePermissionController,
    DeletePermissionController,
    FindByIdPermissionController,
    ListPermissionController,
    UpdatePermissionController,
  ],
  providers: [
    CreatePermissionsUseCase,
    DeletePermissionsUseCase,
    FindByIdPermissionsUseCase,
    ListPermissionsUseCase,
    UpdatePermissionsUseCase,
    {
      provide: PermissionsRepository,
      useClass: PermissionsPrismaRepository,
    },
  ],
})
export class PermissionsModule {}
