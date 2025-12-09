import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { TenantMiddleware } from '../../infra/middleware';

import { AuthModule } from './auth';
import { ModulesModule } from './modules';
import { PagesModule } from './pages';
import { PermissionModulesModule } from './permission-modules';
import { PermissionPagesModule } from './permission-pages';
import { PermissionsModule } from './permissions';
import { TenantStatusModule } from './tenant-status';
import { TenantsModule } from './tenants';
import { UserStatusModule } from './user-status';
import { UsersModule } from './users';

const modules = [
  AuthModule,
  ModulesModule,
  PagesModule,
  PermissionsModule,
  PermissionModulesModule,
  PermissionPagesModule,
  TenantsModule,
  TenantStatusModule,
  UserStatusModule,
  UsersModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class AdminModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('*');
  }
}
