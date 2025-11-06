import { CreateTenantResponseDto } from '@/src/modules/tenants/dto';
import {
  Branch,
  BranchService,
  Service,
  Tenant,
  TenantStatus,
} from '@prisma/client';

export class TenantPrismaMapper {
  static toPrisma(tenant: any) {
    return {
      id: tenant.id,
      name: tenant.name,
      tenantStatusId: tenant.tenantStatusId,
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    };
  }

  static toDomain(
    raw: Tenant & {
      branches: (Branch & {
        branchServices: (BranchService & {
          service: Service;
        })[];
      })[];
    } & {
      tenantStatus: TenantStatus;
    },
  ) {
    return {
      id: raw.id,
      name: raw.name,
      status: raw.tenantStatus.name,
      branches: raw.branches.map((branch) => ({
        id: branch.id,
        name: branch.name,
        phone: branch.phone,
        isWhatsapp: branch.isWhatsapp,
        isMain: branch.isMain,
        address: branch.address,
        neighborhood: branch.neighborhood,
        city: branch.city,
        uf: branch.uf,
        number: branch.number,
        zipCode: branch.zipCode,
        services: branch.branchServices.map((service) => ({
          id: service.id,
          service: service.service.name,
          branch: branch.name,
          description: service.service.description,
          price: service.price,
        })),
      })),
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt?.toISOString(),
    };
  }
}
