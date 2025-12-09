import { UsersEntity } from '@/src/infra';
import {
  CreateUserRequestDto,
  ReadUserResponseDto,
  UpdateUserRequestDto,
} from '@/src/modules/admin/users/dtos';

export class UsersMapper {
  static toDatabase(data: CreateUserRequestDto | UpdateUserRequestDto) {
    return {
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
      phone: data.phone,
      password: data.password,
      document: data.document,
      tenants: {
        id: data.tenantId,
      },
      permissions: data.permissionId ? {
        id: data.permissionId,
      } : undefined,
      userStatus: {
        id: data.userStatusId,
      },
    };
  }

  static toDomain(raw: UsersEntity): ReadUserResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      birthDate: raw.birthDate,
      phone: raw.phone,
      document: raw.document,
      tenant: raw.tenant ? {
        id: raw.tenant.id,
        name: raw.tenant.name,
        subdomain: raw.tenant.subdomain,
        tenantStatus: raw.tenant.tenantStatus ? {
          id: raw.tenant.tenantStatus.id,
          name: raw.tenant.tenantStatus.name,
          createdAt: raw.tenant.tenantStatus.createdAt.toISOString(),
          updatedAt: raw.tenant.tenantStatus.updatedAt
            ? raw.tenant.tenantStatus.updatedAt.toISOString()
            : null,
        } : null,
        createdAt: raw.tenant.createdAt.toISOString(),
        updatedAt: raw.tenant.updatedAt
          ? raw.tenant.updatedAt.toISOString()
          : null,
      } : null,
      permission: raw.permission ? {
        id: raw.permission.id,
        name: raw.permission?.name,
        createdAt: raw.permission?.createdAt.toISOString(),
        updatedAt: raw.permission?.updatedAt
          ? raw.permission?.updatedAt.toISOString()
          : null,
      } : null,
      userStatus: {
        id: raw.userStatus.id,
        name: raw.userStatus.name,
        createdAt: raw.userStatus.createdAt.toISOString(),
        updatedAt: raw.userStatus.updatedAt
          ? raw.userStatus.updatedAt.toISOString()
          : null,
      },
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
