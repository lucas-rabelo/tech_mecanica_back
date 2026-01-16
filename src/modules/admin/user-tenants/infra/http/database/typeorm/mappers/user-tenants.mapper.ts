import type { IdentifyAuthScopeEnum } from '@/src/core';
import { UserTenantsEntity } from '@/src/infra';
import {
  CreateUserTenantRequestDto,
  ReadUserTenantResponseDto,
} from '@/src/modules/admin/user-tenants/dtos';

export class UserTenantsMapper {
  static toDatabase(data: CreateUserTenantRequestDto) {
    return {};
  }

  static toDomain(raw: UserTenantsEntity): ReadUserTenantResponseDto {
    return {
      ...raw,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
