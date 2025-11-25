import { UsersEntity } from '@/src/infra';
import {
  CreateUserRequestDto,
  ReadUserResponseDto,
} from '@/src/modules/users/dtos';

export class UsersMapper {
  static toDatabase(data: CreateUserRequestDto) {
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
      permissions: {
        id: data.permissionId,
      },
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
      permission: raw.permissions.name,
      userStatus: raw.userStatus.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
