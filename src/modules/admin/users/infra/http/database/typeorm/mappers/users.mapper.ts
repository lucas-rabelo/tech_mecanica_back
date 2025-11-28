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
      tenant: raw.tenants.name,
      permission: raw.permissions ? raw.permissions.name : '',
      userStatus: raw.userStatus.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
