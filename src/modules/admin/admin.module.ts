import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TenantMiddleware, TenantsEntity } from "../../infra";

import {
  AuthModule,
  PermissionsModule,
  TenantsModule,
  TenantStatusModule,
  UsersModule,
  UserStatusModule,
} from '.';
import { TypeOrmModule } from "@nestjs/typeorm";

const modules = [
  AuthModule,
  PermissionsModule,
  TenantsModule,
  TenantStatusModule,
  UserStatusModule,
  UsersModule,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantsEntity]),
    ...modules,
  ],
  exports: modules,
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('*');
  }
}
