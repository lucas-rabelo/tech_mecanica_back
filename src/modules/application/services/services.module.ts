import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, UsersModule } from '../../admin';

import { ServicesModule } from '@/src/core';
import {
  CreateServiceUseCase,
  DeleteServiceUseCase,
  FindByIdServiceUseCase,
  ListServiceUseCase,
  UpdateServiceUseCase,
} from './application/use-cases';

import {
  CreateServiceController,
  DeleteServiceController,
  FindByIdServiceController,
  ListServiceController,
  UpdateServiceController,
} from './infra/http/controllers';

import {
  ServiceRepositoryTypeOrm,
  ServicesRepository,
} from './infra/http/database';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CreateServiceController,
    DeleteServiceController,
    FindByIdServiceController,
    ListServiceController,
    UpdateServiceController,
  ],
  providers: [
    CreateServiceUseCase,
    DeleteServiceUseCase,
    FindByIdServiceUseCase,
    ListServiceUseCase,
    UpdateServiceUseCase,
    {
      provide: ServicesRepository,
      useClass: ServiceRepositoryTypeOrm,
    },
  ],
})
export class ServiceModule {}
