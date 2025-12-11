import { TenantMiddleware } from '@/src/infra';
import {
  forwardRef,
  Module,
  NestModule,
  type MiddlewareConsumer,
} from '@nestjs/common';
import { AuthModule, UsersModule } from '../admin';
import { CustomersModule } from './customers';
import { ServicesModule } from '@/src/core';

@Module({
  imports: [
    ServicesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    CustomersModule,
  ],
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
