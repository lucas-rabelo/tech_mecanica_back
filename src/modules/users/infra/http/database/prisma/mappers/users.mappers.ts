import { CreateUserRequestDto } from '@/src/modules/users/dto/request';
import { Permission, Tenant, User, UserStatus } from '@prisma/client';

export class UsersPrismaMapper {
  static toDomain(
    user: User & { tenant?: Tenant | null } & { permission: (Permission & {  }) } & {
      userStatus: UserStatus;
    },
  ) {
    return {
      id: user.id,
      birthDate: user.birthDate.toISOString(),
      document: user.document,
      email: user.email,
      name: user.name,
      permission: user.permission.name,
      permissionId: user.permissionId,
      phone: user.phone,
      tenant: user.tenant?.name || null,
      userStatus: user.userStatus.name,
    };
  }

  static toPrisma(raw: CreateUserRequestDto) {
    return {
      birthDate: raw.birthDate,
      document: raw.document,
      email: raw.email,
      name: raw.name,
      permissionId: raw.permissionId,
      userStatusId: raw.userStatusId,
      phone: raw.phone,
      tenantId: raw.tenantId,
      password: raw.password,
    };
  }
}
