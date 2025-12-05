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
      tenant: raw.tenants ? {
        id: raw.tenants.id,
        name: raw.tenants.name,
        subdomain: raw.tenants.subdomain,
        tenantStatus: raw.tenants.tenantStatus ? {
          id: raw.tenants.tenantStatus.id,
          name: raw.tenants.tenantStatus.name,
          createdAt: raw.tenants.tenantStatus.createdAt.toISOString(),
          updatedAt: raw.tenants.tenantStatus.updatedAt
            ? raw.tenants.tenantStatus.updatedAt.toISOString()
            : null,
        } : null,
        createdAt: raw.tenants.createdAt.toISOString(),
        updatedAt: raw.tenants.updatedAt
          ? raw.tenants.updatedAt.toISOString()
          : null,
      } : null,
      permission: raw.permissions ? {
        id: raw.permissions.id,
        name: raw.permissions?.name,
        createdAt: raw.permissions?.createdAt.toISOString(),
        updatedAt: raw.permissions?.updatedAt
          ? raw.permissions?.updatedAt.toISOString()
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
