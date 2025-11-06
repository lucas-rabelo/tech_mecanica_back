import { PrismaService } from '@/src/infra';
import {
  CreateBranchContactRequestDto,
  ListBranchContactRequestDto,
  ListBranchContactResponseDto,
  ReadBranchContactResponseDto,
} from '@/src/modules/branch-services/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BranchContactsRepository } from '../../branch-contacts.respository';
import { BranchContactPrismaMapper } from '../mappers';

@Injectable()
export class BranchContactsPrismaRepository
  implements BranchContactsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<ReadBranchContactResponseDto | null> {
    const branchServiceFounded = await this.prisma.branchContact.findUnique({
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

    return BranchContactPrismaMapper.toDomain(branchServiceFounded);
  }

  async findByContactId(
    contactId: number,
  ): Promise<ReadBranchContactResponseDto | null> {
    const branchServiceFounded = await this.prisma.branchContact.findFirst({
      where: {
        contactId,
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

    return BranchContactPrismaMapper.toDomain(branchServiceFounded);
  }
  
  async findByBranchId(
    branchId: number,
  ): Promise<ReadBranchContactResponseDto | null> {
    const branchServiceFounded = await this.prisma.branchContact.findFirst({
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

    return BranchContactPrismaMapper.toDomain(branchServiceFounded);
  }

  async create(
    data: CreateBranchContactRequestDto,
  ): Promise<ReadBranchContactResponseDto> {
    const branchServiceData = BranchContactPrismaMapper.toPrisma(data);

    const branchServiceCreate = await this.prisma.branchContact.create({
      data: branchServiceData,
      include: {
        branch: true,
        service: true,
      },
    });

    return BranchContactPrismaMapper.toDomain(branchServiceCreate);
  }

  async update(
    id: number,
    data: CreateBranchContactRequestDto,
  ): Promise<ReadBranchContactResponseDto | null> {
    const branchServiceData = BranchContactPrismaMapper.toPrisma(data);

    const branchServiceUpdated = await this.prisma.branchContact.update({
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

    return BranchContactPrismaMapper.toDomain(branchServiceUpdated);
  }

  async delete(id: number): Promise<ReadBranchContactResponseDto | null> {
    const branchServiceDeleted = await this.prisma.branchContact.update({
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

    return BranchContactPrismaMapper.toDomain(branchServiceDeleted);
  }

  async list(
    filters: ListBranchContactRequestDto,
  ): Promise<ListBranchContactResponseDto> {
    let where: Prisma.BranchContactWhereInput = {
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

    const total = await this.prisma.branchContact.count({
      where,
    });

    const services = await this.prisma.branchContact.findMany({
      where,
      skip,
      take,
      include: {
        branch: true,
        service: true,
      },
    });

    return {
      branchContacts: services.map(BranchContactPrismaMapper.toDomain),
      total,
    };
  }
}
