import { PrismaService } from '@/src/infra';
import {
  CreateBranchServiceRequestDto,
  ListBranchServiceRequestDto,
  ListBranchServiceResponseDto,
  ReadBranchServiceResponseDto,
} from '@/src/modules/branch-services/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BranchServicesRepository } from '../../branch-services.respository';
import { BranchServicePrismaMapper } from '../mappers';

@Injectable()
export class BranchServicesPrismaRepository
  implements BranchServicesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<ReadBranchServiceResponseDto | null> {
    const branchServiceFounded = await this.prisma.branchService.findUnique({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        branch: true,
        service: true,
      },
    });

    if (!branchServiceFounded) {
      return null;
    }

    return BranchServicePrismaMapper.toDomain(branchServiceFounded);
  }

  async findByServiceId(
    serviceId: number,
  ): Promise<ReadBranchServiceResponseDto | null> {
    const branchServiceFounded = await this.prisma.branchService.findFirst({
      where: {
        serviceId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        branch: true,
        service: true,
      },
    });

    if (!branchServiceFounded) {
      return null;
    }

    return BranchServicePrismaMapper.toDomain(branchServiceFounded);
  }
  
  async findByBranchId(
    branchId: number,
  ): Promise<ReadBranchServiceResponseDto | null> {
    const branchServiceFounded = await this.prisma.branchService.findFirst({
      where: {
        branchId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        branch: true,
        service: true,
      },
    });

    if (!branchServiceFounded) {
      return null;
    }

    return BranchServicePrismaMapper.toDomain(branchServiceFounded);
  }

  async create(
    data: CreateBranchServiceRequestDto,
  ): Promise<ReadBranchServiceResponseDto> {
    const branchServiceData = BranchServicePrismaMapper.toPrisma(data);

    const branchServiceCreate = await this.prisma.branchService.create({
      data: branchServiceData,
      include: {
        branch: true,
        service: true,
      },
    });

    return BranchServicePrismaMapper.toDomain(branchServiceCreate);
  }

  async update(
    id: number,
    data: CreateBranchServiceRequestDto,
  ): Promise<ReadBranchServiceResponseDto | null> {
    const branchServiceData = BranchServicePrismaMapper.toPrisma(data);

    const branchServiceUpdated = await this.prisma.branchService.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: branchServiceData,
      include: {
        branch: true,
        service: true,
      },
    });

    return BranchServicePrismaMapper.toDomain(branchServiceUpdated);
  }

  async delete(id: number): Promise<ReadBranchServiceResponseDto | null> {
    const branchServiceDeleted = await this.prisma.branchService.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        branch: true,
        service: true,
      },
    });

    return BranchServicePrismaMapper.toDomain(branchServiceDeleted);
  }

  async list(
    filters: ListBranchServiceRequestDto,
  ): Promise<ListBranchServiceResponseDto> {
    let where: Prisma.BranchServiceWhereInput = {
      deletedAt: {
        equals: null,
      },
    };

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.branchId) {
      where.branchId = {
        equals: filters.branchId,
      };
    }

    if (filters.serviceId) {
      where.serviceId = {
        equals: filters.serviceId,
      };
    }

    const total = await this.prisma.branchService.count({
      where,
    });

    const services = await this.prisma.branchService.findMany({
      where,
      skip,
      take,
      include: {
        branch: true,
        service: true,
      },
    });

    return {
      branchServices: services.map(BranchServicePrismaMapper.toDomain),
      total,
    };
  }
}
