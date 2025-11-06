import { PrismaService } from '@/src/infra';
import {
  CreatePermissionPagesRequestDto,
  ListPermissionPagesRequestDto,
  ListPermissionPagesResponseDto,
  ReadPermissionPagesResponseDto,
} from '@/src/modules/permission-pages/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PermissionPagesRepository } from '../../permission-pages.repository';
import { PermissionPagesPrismaMapper } from '../mappers';

@Injectable()
export class PermissionPagesPrismaRepository
  implements PermissionPagesRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: CreatePermissionPagesRequestDto,
  ): Promise<ReadPermissionPagesResponseDto> {
    const PermissionPage = PermissionPagesPrismaMapper.toPrisma(data);

    const PermissionPageCreated = await this.prisma.permissionPage.create({
      data: PermissionPage,
      include: {
        page: true,
        permission: true,
      },
    });

    return PermissionPagesPrismaMapper.toDomain(PermissionPageCreated);
  }

  async update(
    id: number,
    data: CreatePermissionPagesRequestDto,
  ): Promise<ReadPermissionPagesResponseDto> {
    const PermissionPage = PermissionPagesPrismaMapper.toPrisma(data);

    const permissionPageUpdated = await this.prisma.permissionPage.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        }
      },
      data: PermissionPage,
      include: {
        permission: true,
        page: true,
      },
    });

    return PermissionPagesPrismaMapper.toDomain(permissionPageUpdated);
  }

  async findById(id: number): Promise<ReadPermissionPagesResponseDto | null> {
    const permissionPageFounded = await this.prisma.permissionPage.findUnique({
      where: {
        id,
        deletedAt: {
          equals: null,
        }
      },
      include: {
        permission: true,
        page: true,
      },
    });

    if (!permissionPageFounded) {
      return null;
    }

    return PermissionPagesPrismaMapper.toDomain(permissionPageFounded);
  }

  async findByPageId(pageId: number): Promise<ReadPermissionPagesResponseDto | null> {
    const permissionPageFounded = await this.prisma.permissionPage.findFirst({
      where: {
        pageId,
        deletedAt: {
          equals: null,
        }
      },
      include: {
        permission: true,
        page: true,
      },
    });

    if (!permissionPageFounded) {
      return null;
    }

    return PermissionPagesPrismaMapper.toDomain(permissionPageFounded);
  }
  async findByPermissionId(permissionId: number): Promise<ReadPermissionPagesResponseDto | null> {
    const permissionPageFounded = await this.prisma.permissionPage.findFirst({
      where: {
        permissionId,
        deletedAt: {
          equals: null,
        }
      },
      include: {
        permission: true,
        page: true,
      },
    });

    if (!permissionPageFounded) {
      return null;
    }

    return PermissionPagesPrismaMapper.toDomain(permissionPageFounded);
  }

  async delete(id: number): Promise<any> {
    const permissionPageUpdated = await this.prisma.permissionPage.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        }
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        permission: true,
        page: true,
      },
    });

    return PermissionPagesPrismaMapper.toDomain(permissionPageUpdated);
  }

  async list(
    filters: ListPermissionPagesRequestDto,
  ): Promise<ListPermissionPagesResponseDto> {
    let where: Prisma.PermissionPageWhereInput = { deletedAt: { equals: null } };

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.pageId) {
      where.pageId = {
        equals: filters.pageId,
      };
    }

    if (filters.permissionId) {
      where.permissionId = {
        equals: filters.permissionId,
      };
    }

    const total = await this.prisma.permissionPage.count({
      where,
    });

    const permissionPages = await this.prisma.permissionPage.findMany({
      where,
      skip,
      take,
      include: {
        permission: true,
        page: true,
      },
    });

    return {
      permissionPages: permissionPages.map(
        PermissionPagesPrismaMapper.toDomain,
      ),
      total,
    };
  }
}
