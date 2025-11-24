import { TenantsEntity, TenantStatusEntity } from '@/src/infra';
import { ReadTenantsResponseDto } from '@/src/modules/tenants/dtos';

export class TenantsMapper {
  static toDomain(
    raw: TenantsEntity & { tenantStatus: TenantStatusEntity },
  ): ReadTenantsResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      subdomain: raw.subdomain,
      tenantStatus: raw.tenantStatus.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt?.toISOString() ?? null,
    };
  }
}
