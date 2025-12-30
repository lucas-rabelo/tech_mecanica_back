import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, UsersModule } from '../../admin';

import { ServicesModule } from '@/src/core';
import {
  CreateServiceMaterialUseCase,
  DeleteServiceMaterialUseCase,
  FindByIdServiceMaterialUseCase,
  ListServiceMaterialUseCase,
  UpdateServiceMaterialUseCase,
} from './application/use-cases';

import {
  CreateServiceMaterialController,
  DeleteServiceMaterialController,
  FindByIdServiceMaterialController,
  ListServiceMaterialController,
  UpdateServiceMaterialController,
} from './infra/http/controllers';

import {
  ServiceMaterialsRepository,
  ServiceMaterialsRepositoryTypeOrm,
} from './infra/http/database';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CreateServiceMaterialController,
    DeleteServiceMaterialController,
    FindByIdServiceMaterialController,
    ListServiceMaterialController,
    UpdateServiceMaterialController,
  ],
  providers: [
    CreateServiceMaterialUseCase,
    DeleteServiceMaterialUseCase,
    FindByIdServiceMaterialUseCase,
    ListServiceMaterialUseCase,
    UpdateServiceMaterialUseCase,
    {
      provide: ServiceMaterialsRepository,
      useClass: ServiceMaterialsRepositoryTypeOrm,
    },
  ],
})
export class ServiceMaterialsModule {}
