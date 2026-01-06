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
      id: raw.id,
      user: {
        ...raw.user,
        createdAt: raw.user.createdAt.toISOString(),
        updatedAt: raw.user.updatedAt
          ? raw.user.updatedAt.toISOString()
          : null,
        userStatus: {
          ...raw.user.userStatus,
          createdAt: raw.user.userStatus.createdAt.toISOString(),
          updatedAt: raw.user.userStatus.updatedAt
            ? raw.user.userStatus.updatedAt.toISOString()
            : null,
        },
      },
      tenant: {
        ...raw.tenant,
        createdAt: raw.tenant.createdAt.toISOString(),
        updatedAt: raw.tenant.updatedAt
          ? raw.tenant.updatedAt.toISOString()
          : null,
        tenantStatus: {
          ...raw.tenant.tenantStatus,
          createdAt: raw.tenant.tenantStatus.createdAt.toISOString(),
          updatedAt: raw.tenant.tenantStatus.updatedAt
            ? raw.tenant.tenantStatus.updatedAt.toISOString()
            : null,
        },
      },
      permission: {
        ...raw.permission,
        createdAt: raw.permission.createdAt.toISOString(),
        updatedAt: raw.permission.updatedAt
          ? raw.permission.updatedAt.toISOString()
          : null,
      },
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
