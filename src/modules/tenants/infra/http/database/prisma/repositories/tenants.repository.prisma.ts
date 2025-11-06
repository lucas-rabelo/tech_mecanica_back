import { PrismaService } from '@/src/infra';
import {
  CreateTenantRequestDto,
  FindByIdTenantResponseDto,
  ListTenantRequestDto,
  ListTenantResponseDto,
} from '@/src/modules/tenants/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TenantsRepository } from '../../tenants.repository';
import { TenantPrismaMapper } from '../mappers';

@Injectable()
export class TenantsPrismaRepository implements TenantsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<FindByIdTenantResponseDto | null> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        tenantStatus: true,
        branches: {
          include: {
            branchServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });

    if (!tenant) {
      return null;
    }

    return TenantPrismaMapper.toDomain(tenant);
  }

  async findByTenantStatusId(
    tenantStatusId: number,
  ): Promise<FindByIdTenantResponseDto | null> {
    const tenant = await this.prisma.tenant.findFirst({
      where: {
        tenantStatusId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        tenantStatus: true,
        branches: {
          include: {
            branchServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });

    if (!tenant) {
      return null;
    }

    return TenantPrismaMapper.toDomain(tenant);
  }

  async delete(id: number): Promise<FindByIdTenantResponseDto | null> {
    const tenantFounded = await this.prisma.tenant.delete({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        tenantStatus: true,
        branches: {
          include: {
            branchServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });

    if (!tenantFounded) {
      return null;
    }

    return TenantPrismaMapper.toDomain(tenantFounded);
  }

  async list(filters: ListTenantRequestDto): Promise<ListTenantResponseDto> {
    let where: Prisma.TenantWhereInput = {
      deletedAt: {
        equals: null,
      },
    };

    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.tenantStatusId?.length) {
      where.tenantStatusId = {
        in: filters.tenantStatusId,
      };
    }

    const total = await this.prisma.tenant.count({
      where,
    });

    const tenants = await this.prisma.tenant.findMany({
      where,
      take,
      skip,
      include: {
        tenantStatus: true,
        branches: {
          include: {
            branchServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });

    return {
      tenants: tenants.map((tenant) => {
        const { id, name, status, createdAt, updatedAt } =
          TenantPrismaMapper.toDomain(tenant);

        return {
          id,
          name,
          status,
          createdAt,
          updatedAt,
        };
      }),
      total,
    };
  }

  async create(
    data: CreateTenantRequestDto,
  ): Promise<FindByIdTenantResponseDto> {
    const tenant = TenantPrismaMapper.toPrisma(data);

    const tenantCreated = await this.prisma.tenant.create({
      data: tenant,
      include: {
        tenantStatus: true,
        branches: {
          include: {
            branchServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });

    return TenantPrismaMapper.toDomain(tenantCreated);
  }

  async update(
    id: number,
    data: CreateTenantRequestDto,
  ): Promise<FindByIdTenantResponseDto> {
    const tenant = TenantPrismaMapper.toPrisma(data);

    const tenantUpdated = await this.prisma.tenant.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: tenant,
      include: {
        tenantStatus: true,
        branches: {
          include: {
            branchServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });

    return TenantPrismaMapper.toDomain(tenantUpdated);
  }
}
