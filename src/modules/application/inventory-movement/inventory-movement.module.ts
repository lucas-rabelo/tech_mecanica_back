import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, UsersModule } from '../../admin';

import { ServicesModule } from '@/src/core';
import {
  CreateInventoryMovementUseCase,
  FindByIdInventoryMovementUseCase,
  ListInventoryMovementUseCase,
  ListOptionsSelectUseCase
} from './application/use-cases';

import {
  CreateInventoryMovementController,
  FindByIdInventoryMovementController,
  ListInventoryMovementController,
  ListOptionsInventoryMovementController
} from './infra/http/controllers';

import {
  InventoryMovementRepositoryTypeOrm,
  InventoryMovementsRepository,
} from './infra/http/database';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CreateInventoryMovementController,
    FindByIdInventoryMovementController,
    ListInventoryMovementController,
    ListOptionsInventoryMovementController,
  ],
  providers: [
    CreateInventoryMovementUseCase,
    FindByIdInventoryMovementUseCase,
    ListInventoryMovementUseCase,
    ListOptionsSelectUseCase,
    {
      provide: InventoryMovementsRepository,
      useClass: InventoryMovementRepositoryTypeOrm,
    },
  ],
})
export class InventoryMovementModule {}
