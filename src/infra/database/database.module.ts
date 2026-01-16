import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ModulesEntity,
  PagesEntity,
  PermissionModulesEntity,
  PermissionPagesEntity,
  PermissionsEntity,
  TenantStatusEntity,
  TenantsEntity,
  UserStatusEntity,
  UserTenantsEntity,
  UsersEntity,
} from './entities';

const entities = [
  ModulesEntity,
  PagesEntity,
  PermissionModulesEntity,
  PermissionPagesEntity,
  PermissionsEntity,
  TenantStatusEntity,
  TenantsEntity,
  UserStatusEntity,
  UserTenantsEntity,
  UsersEntity,
];

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
