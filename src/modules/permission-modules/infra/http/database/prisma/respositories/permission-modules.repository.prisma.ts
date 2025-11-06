import { PrismaService } from '@/src/infra';
import {
  CreatePermissionModulesRequestDto,
  ListPermissionModulesRequestDto,
  ListPermissionModulesResponseDto,
  ReadPermissionModulesResponseDto,
} from '@/src/modules/permission-modules/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PermissionModulesRepository } from '../../permission-modules.repository';
import { PermissionModulesPrismaMapper } from '../mappers';

@Injectable()
export class PermissionModulesPrismaRepository
  implements PermissionModulesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreatePermissionModulesRequestDto,
  ): Promise<ReadPermissionModulesResponseDto> {
    const permissionModule = PermissionModulesPrismaMapper.toPrisma(data);

    const permissionModuleCreated = await this.prisma.permissionModule.create({
      data: permissionModule,
      include: {
        module: true,
        permission: true,
      },
    });

    return PermissionModulesPrismaMapper.toDomain(permissionModuleCreated);
  }

  async update(
    id: number,
    data: CreatePermissionModulesRequestDto,
  ): Promise<ReadPermissionModulesResponseDto> {
    const permissionModule = PermissionModulesPrismaMapper.toPrisma(data);

    const permissionModuleUpdated = await this.prisma.permissionModule.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: permissionModule,
      include: {
        module: true,
        permission: true,
      },
    });

    return PermissionModulesPrismaMapper.toDomain(permissionModuleUpdated);
  }

  async findById(id: number): Promise<ReadPermissionModulesResponseDto | null> {
    const permissionModuleFounded =
      await this.prisma.permissionModule.findUnique({
        where: {
          id,
          deletedAt: {
            equals: null,
          },
        },
        include: {
          module: true,
          permission: true,
        },
      });

    if (!permissionModuleFounded) {
      return null;
    }

    return PermissionModulesPrismaMapper.toDomain(permissionModuleFounded);
  }

  async findByModuleId(moduleId: number): Promise<ReadPermissionModulesResponseDto | null> {
    const permissionModuleFounded =
      await this.prisma.permissionModule.findFirst({
        where: {
          moduleId,
          deletedAt: {
            equals: null,
          },
        },
        include: {
          module: true,
          permission: true,
        },
      });

    if (!permissionModuleFounded) {
      return null;
    }

    return PermissionModulesPrismaMapper.toDomain(permissionModuleFounded);
  }
  async findByPermissionId(permissionId: number): Promise<ReadPermissionModulesResponseDto | null> {
    const permissionModuleFounded =
      await this.prisma.permissionModule.findFirst({
        where: {
          permissionId,
          deletedAt: {
            equals: null,
          },
        },
        include: {
          module: true,
          permission: true,
        },
      });

    if (!permissionModuleFounded) {
      return null;
    }

    return PermissionModulesPrismaMapper.toDomain(permissionModuleFounded);
  }

  async delete(id: number): Promise<ReadPermissionModulesResponseDto> {
    const permissionModuleUpdated = await this.prisma.permissionModule.update({
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
        module: true,
        permission: true,
      },
    });

    return PermissionModulesPrismaMapper.toDomain(permissionModuleUpdated);
  }

  async list(
    filters: ListPermissionModulesRequestDto,
  ): Promise<ListPermissionModulesResponseDto> {
    let where: Prisma.PermissionModuleWhereInput = {
      deletedAt: { equals: null },
    };

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.moduleId) {
      where.moduleId = {
        equals: filters.moduleId,
      };
    }

    if (filters.permissionId) {
      where.moduleId = {
        equals: filters.moduleId,
      };
    }

    const total = await this.prisma.permissionModule.count({
      where,
    });

    const permissionModules = await this.prisma.permissionModule.findMany({
      where,
      skip,
      take,
      include: {
        permission: true,
        module: true,
      },
    });

    return {
      permissionModules: permissionModules.map(
        PermissionModulesPrismaMapper.toDomain,
      ),
      total,
    };
  }
}
