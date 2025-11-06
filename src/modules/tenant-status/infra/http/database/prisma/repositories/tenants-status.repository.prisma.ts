import { PrismaService } from '@/src/infra';
import {
  CreateTenantStatusRequestDto,
  CreateTenantStatusResponseDto,
  ListTenantStatusRequestDto,
} from '@/src/modules/tenant-status/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TenantStatusRepository } from '../../tenant-status.respository';

@Injectable()
export class TenantStatusPrismaRespository implements TenantStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<CreateTenantStatusResponseDto | null> {
    const tenantStatusFounded = await this.prisma.tenantStatus.findUnique({
      where: { id },
    });

    if (!tenantStatusFounded) {
      return null;
    }

    return tenantStatusFounded;
  }

  async create(data: CreateTenantStatusRequestDto): Promise<CreateTenantStatusResponseDto> {
    return await this.prisma.tenantStatus.create({
      data,
    });
  }

  async update(
    id: number,
    data: CreateTenantStatusRequestDto,
  ): Promise<CreateTenantStatusResponseDto> {
    return this.prisma.tenantStatus.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<CreateTenantStatusResponseDto> {
    return this.prisma.tenantStatus.delete({
      where: { id },
    });
  }

  async list(
    filters: ListTenantStatusRequestDto,
  ): Promise<CreateTenantStatusResponseDto[]> {
    let where: Prisma.TenantStatusWhereInput = {};

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.id) {
      where.id = {
        equals: filters.id,
      };
    }

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    return this.prisma.tenantStatus.findMany({
      where,
      skip,
      take,
    });
  }
}
