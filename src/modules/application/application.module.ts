import { ServicesModule } from '@/src/core';
import { TenantMiddleware } from '@/src/infra';
import {
  forwardRef,
  Module,
  NestModule,
  type MiddlewareConsumer,
} from '@nestjs/common';
import { AuthModule, UsersModule } from '../admin';
import { CustomersModule } from './customers';
import { InventoryMovementModule } from './inventory-movement';
import { ServiceModule } from './services';
import { StockModule } from './stock';
import { VehiclesModule } from './vehicles';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    CustomersModule,
    VehiclesModule,
    StockModule,
    InventoryMovementModule,
    ServiceModule,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
