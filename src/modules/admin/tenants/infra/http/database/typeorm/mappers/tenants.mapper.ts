import { TenantsEntity } from '@/src/infra';
import { ReadTenantsResponseDto } from '@/src/modules/admin/tenants/dtos';

export class TenantsMapper {
  static toDomain(raw: TenantsEntity): ReadTenantsResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      subdomain: raw.subdomain,
      tenantStatus: {
        id: raw.tenantStatus.id,
        name: raw.tenantStatus.name,
        createdAt: raw.tenantStatus.createdAt.toISOString(),
        updatedAt: raw.tenantStatus.updatedAt
          ? raw.tenantStatus.updatedAt.toISOString()
          : null,
      },
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt?.toISOString() ?? null,
    };
  }
}
