import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, UsersModule } from '../../admin';

import { ServicesModule } from '@/src/core';
import {
  CreateVehicleUseCase,
  DeleteVehicleUseCase,
  FindByIdVehicleUseCase,
  ListVehicleUseCase,
  UpdateVehicleUseCase,
} from './application/use-cases';

import {
  CreateVehicleController,
  DeleteVehicleController,
  FindByIdVehicleController,
  ListVehicleController,
  UpdateVehicleController,
} from './infra/http/controllers';

import {
  VehicleRepositoryTypeOrm,
  VehiclesRepository,
} from './infra/http/database';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CreateVehicleController,
    DeleteVehicleController,
    FindByIdVehicleController,
    ListVehicleController,
    UpdateVehicleController,
  ],
  providers: [
    CreateVehicleUseCase,
    DeleteVehicleUseCase,
    FindByIdVehicleUseCase,
    ListVehicleUseCase,
    UpdateVehicleUseCase,
    {
      provide: VehiclesRepository,
      useClass: VehicleRepositoryTypeOrm,
    },
  ],
})
export class VehiclesModule {}
