import { Module } from '@nestjs/common';

import { AuthModule } from './auth';
import { ModulesModule } from './modules';
import { PagesModule } from './pages';
import { PermissionModulesModule } from './permission-modules';
import { PermissionPagesModule } from './permission-pages';
import { PermissionsModule } from './permissions';
import { TenantStatusModule } from './tenant-status';
import { TenantsModule } from './tenants';
import { UserStatusModule } from './user-status';
import { UserTenantsModule } from './user-tenants';
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
  UserTenantsModule,
  UsersModule,
];

@Module({
  imports: modules,
  exports: modules,
})
export class AdminModule {}
