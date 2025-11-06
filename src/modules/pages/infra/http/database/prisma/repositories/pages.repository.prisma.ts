import { PrismaService } from '@/src/infra';
import {
  CreatePageRequestDto,
  ListPageRequestDto,
  ListPageResponseDto,
  ReadPageResponseDto,
} from '@/src/modules/pages/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PagesRepository } from '../../pages.repository';
import { PagesPrismaMapper } from '../mappers';

@Injectable()
export class PagesPrismaRepository implements PagesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePageRequestDto): Promise<ReadPageResponseDto> {
    const page = PagesPrismaMapper.toPrisma(data);

    const pageCreated = await this.prisma.page.create({
      data: page,
      include: {
        module: true,
      },
    });

    return PagesPrismaMapper.toDomain(pageCreated);
  }

  async update(
    id: number,
    data: CreatePageRequestDto,
  ): Promise<ReadPageResponseDto> {
    const page = PagesPrismaMapper.toPrisma(data);

    const pageUpdated = await this.prisma.page.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: page,
      include: {
        module: true,
      },
    });

    return PagesPrismaMapper.toDomain(pageUpdated);
  }

  async findById(id: number): Promise<ReadPageResponseDto | null> {
    const pageFounded = await this.prisma.page.findUnique({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        module: true,
      },
    });

    if (!pageFounded) {
      return null;
    }

    return PagesPrismaMapper.toDomain(pageFounded);
  }

  async list(filters: ListPageRequestDto): Promise<ListPageResponseDto> {
    let where: Prisma.PageWhereInput = {
      deletedAt: {
        equals: null,
      },
    };

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.moduleId) {
      where.moduleId = {
        equals: filters.moduleId,
      };
    }

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    const total = await this.prisma.page.count({
      where,
    });

    const branches = await this.prisma.page.findMany({
      where,
      skip,
      take,
      include: {
        module: true,
      },
    });

    return {
      pages: branches.map(PagesPrismaMapper.toDomain),
      total,
    };
  }

  async delete(id: number): Promise<ReadPageResponseDto> {
    const pageUpdated = await this.prisma.page.update({
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
      },
    });

    return PagesPrismaMapper.toDomain(pageUpdated);
  }
}
