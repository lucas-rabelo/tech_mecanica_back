import { PrismaService } from '@/src/infra';
import {
  CreateBranchRequestDto,
  CreateBranchResponseDto,
  ListBranchRequestDto,
} from '@/src/modules/branches/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { BranchesRepository } from '../../branches.repository';
import { BranchPrismaMapper } from '../mappers';

@Injectable()
export class BranchesPrismaRepository implements BranchesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<CreateBranchResponseDto | null> {
    const branchCreated = await this.prisma.branch.findUnique({
      where: { 
        id,
        deletedAt: {
          equals: null,
        }
      },
      include: {
        branchServices: {
          include: {
            service: true,
          },
        },
      },
    });

    if (!branchCreated) {
      return null;
    }

    return BranchPrismaMapper.toDomain(branchCreated);
  }
  async create(data: CreateBranchRequestDto): Promise<CreateBranchResponseDto> {
    const branch = BranchPrismaMapper.toPrisma(data);

    const branchCreated = await this.prisma.branch.create({
      data: branch,
      include: {
        branchServices: {
          include: {
            service: true,
          },
        },
      },
    });

    return BranchPrismaMapper.toDomain(branchCreated);
  }
  async update(
    id: number,
    data: CreateBranchRequestDto,
  ): Promise<CreateBranchResponseDto> {
    const branch = BranchPrismaMapper.toPrisma(data);

    const branchUpdated = await this.prisma.branch.update({
      where: { 
        id,
        deletedAt: {
          equals: null,
        }
      },
      data: branch,
      include: {
        branchServices: {
          include: {
            service: true,
          },
        },
      },
    });

    return BranchPrismaMapper.toDomain(branchUpdated);
  }
  async delete(id: number): Promise<CreateBranchResponseDto> {
    const branchDelete = await this.prisma.branch.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      include: {
        branchServices: {
          include: {
            service: true,
          },
        },
      },
    });

    return BranchPrismaMapper.toDomain(branchDelete);
  }
  async list(
    filters: ListBranchRequestDto,
  ): Promise<{ total: number; branches: CreateBranchResponseDto[] }> {
    let where: Prisma.BranchWhereInput = { deletedAt: { equals: null } };

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    where.tenantId = {
      equals: filters.tenantId,
    };

    const total = await this.prisma.branch.count({
      where,
    });

    const branches = await this.prisma.branch.findMany({
      where,
      skip,
      take,
      include: {
        branchServices: {
          include: {
            service: true,
          },
        },
      },
    });

    return {
      branches: branches.map(BranchPrismaMapper.toDomain),
      total,
    };
  }
}
