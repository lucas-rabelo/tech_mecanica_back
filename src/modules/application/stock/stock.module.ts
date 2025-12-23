import { forwardRef, Module } from '@nestjs/common';
import { AuthModule, UsersModule } from '../../admin';

import { ServicesModule } from '@/src/core';
import {
  CreateStockItemUseCase,
  DeleteStockItemUseCase,
  FindByIdStockItemUseCase,
  ListStockItemUseCase,
  UpdateStockItemUseCase,
} from './application/use-cases';

import {
  CreateStockItemController,
  DeleteStockItemController,
  FindByIdStockItemController,
  ListStockItemController,
  UpdateStockItemController,
} from './infra/http/controllers';

import {
  StockItemRepositoryTypeOrm,
  StockItemsRepository,
} from './infra/http/database';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [
    CreateStockItemController,
    DeleteStockItemController,
    FindByIdStockItemController,
    ListStockItemController,
    UpdateStockItemController,
  ],
  providers: [
    CreateStockItemUseCase,
    DeleteStockItemUseCase,
    FindByIdStockItemUseCase,
    ListStockItemUseCase,
    UpdateStockItemUseCase,
    {
      provide: StockItemsRepository,
      useClass: StockItemRepositoryTypeOrm,
    },
  ],
})
export class StockModule {}
