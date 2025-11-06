import { PrismaService } from '@/src/infra';
import {
  CreateModuleRequestDto,
  ListModuleRequestDto,
  ListModuleResponseDto,
  ReadModuleResponseDto,
} from '@/src/modules/modules/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ModuleRepository } from '../../module.repository';
import { ModulePrismaMapper } from '../mappers';

@Injectable()
export class ModulePrismaRepository implements ModuleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateModuleRequestDto): Promise<ReadModuleResponseDto> {
    const module = ModulePrismaMapper.toPrisma(data);

    const moduleCreated = await this.prisma.module.create({
      data: module,
    });

    return ModulePrismaMapper.toDomain(moduleCreated);
  }

  async update(
    id: number,
    data: CreateModuleRequestDto,
  ): Promise<ReadModuleResponseDto> {
    const module = ModulePrismaMapper.toPrisma(data);

    const moduleUpdated = await this.prisma.module.update({
      where: {
        id,
      },
      data: module,
    });

    return ModulePrismaMapper.toDomain(moduleUpdated);
  }

  async findById(id: number): Promise<ReadModuleResponseDto | null> {
    const moduleFounded = await this.prisma.module.findUnique({
      where: {
        id,
      },
    });

    if (!moduleFounded) {
      return null;
    }

    return ModulePrismaMapper.toDomain(moduleFounded);
  }

  async delete(id: number): Promise<any> {
    return this.prisma.module.delete({
      where: {
        id,
      },
    });
  }

  async list(filters: ListModuleRequestDto): Promise<ListModuleResponseDto> {
    let where: Prisma.ModuleWhereInput = {};

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    const total = await this.prisma.module.count({
      where,
    });

    const branches = await this.prisma.module.findMany({
      where,
      skip,
      take,
    });

    return {
      modules: branches.map(ModulePrismaMapper.toDomain),
      total,
    };
  }
}
