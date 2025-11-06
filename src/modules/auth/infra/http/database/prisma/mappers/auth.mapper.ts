import { RegisterUserAuthRequestDto } from '@/src/modules/auth/dto';
import { Permission, Tenant, User, UserStatus } from '@prisma/client';
import { DEFAULT_VALUES } from '../constants';

export class AuthPrismaMapper {
  static toDomain(
    user: User & { tenant?: Tenant | null } & { permission: Permission } & {
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
      password: user.password,
      phone: user.phone,
      tenant: user.tenant?.name || null,
      userStatus: user.userStatus.name,
      permissionId: user.permissionId,
      userStatusId: user.userStatusId,
      tenantId: user.tenantId,
    };
  }

    static toPrisma(raw: RegisterUserAuthRequestDto) {
      return {
        birthDate: raw.birthDate,
        document: raw.document,
        email: raw.email,
        name: raw.name,
        permissionId: DEFAULT_VALUES.PERMISSION_ID,
        userStatusId: DEFAULT_VALUES.USER_STATUS_ID,
        phone: raw.phone,
        tenantId: DEFAULT_VALUES.TENANT_ID,
        password: raw.password,
      };
    }
}
