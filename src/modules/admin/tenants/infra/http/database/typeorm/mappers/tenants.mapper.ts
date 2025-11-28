import { TenantsEntity } from '@/src/infra';
import { ReadTenantsResponseDto } from '@/src/modules/admin/tenants/dtos';

export class TenantsMapper {
  static toDomain(raw: TenantsEntity): ReadTenantsResponseDto {
    console.log({raw});

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
