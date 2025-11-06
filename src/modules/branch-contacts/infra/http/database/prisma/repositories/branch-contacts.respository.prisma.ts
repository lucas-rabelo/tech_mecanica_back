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
    const branchContactFounded = await this.prisma.branchContact.findUnique({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        branch: true,
      },
    });

    if (!branchContactFounded) {
      return null;
    }

    return BranchContactPrismaMapper.toDomain(branchContactFounded);
  }

  async findByBranchId(
    branchId: number,
  ): Promise<ReadBranchContactResponseDto | null> {
    const branchContactFounded = await this.prisma.branchContact.findFirst({
      where: {
        branchId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        branch: true,
      },
    });

    if (!branchContactFounded) {
      return null;
    }

    return BranchContactPrismaMapper.toDomain(branchContactFounded);
  }

  async create(
    data: CreateBranchContactRequestDto,
  ): Promise<ReadBranchContactResponseDto> {
    const branchContactData = BranchContactPrismaMapper.toPrisma(data);

    const branchContactCreate = await this.prisma.branchContact.create({
      data: branchContactData,
      include: {
        branch: true,
      },
    });

    return BranchContactPrismaMapper.toDomain(branchContactCreate);
  }

  async update(
    id: number,
    data: CreateBranchContactRequestDto,
  ): Promise<ReadBranchContactResponseDto | null> {
    const branchContactData = BranchContactPrismaMapper.toPrisma(data);

    const branchContactUpdated = await this.prisma.branchContact.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: branchContactData,
      include: {
        branch: true,
      },
    });

    return BranchContactPrismaMapper.toDomain(branchContactUpdated);
  }

  async delete(id: number): Promise<ReadBranchContactResponseDto | null> {
    const branchContactDeleted = await this.prisma.branchContact.update({
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
      },
    });

    return BranchContactPrismaMapper.toDomain(branchContactDeleted);
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

    const total = await this.prisma.branchContact.count({
      where,
    });

    const services = await this.prisma.branchContact.findMany({
      where,
      skip,
      take,
      include: {
        branch: true,
      },
    });

    return {
      branchContacts: services.map(BranchContactPrismaMapper.toDomain),
      total,
    };
  }
}
