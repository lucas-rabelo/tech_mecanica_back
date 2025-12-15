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
import { VehiclesModule } from './vehicles';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    CustomersModule,
    VehiclesModule,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
