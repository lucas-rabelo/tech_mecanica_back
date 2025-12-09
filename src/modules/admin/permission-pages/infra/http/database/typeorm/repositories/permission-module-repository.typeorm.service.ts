import {
  DeletedAndUpdatedDataResponseDto,
  PermissionPagesEntity,
} from '@/src/infra';
import {
  CreatePermissionPageRequestDto,
  FilterListPermissionPageRequestDto,
  ListPermissionPagesResponseDto,
  ReadPermissionPageResponseDto,
} from '@/src/modules/admin/permission-pages/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PermissionPagesRepository } from '../../permission-pages.repository';
import { PermissionPageMapper } from '../mappers';

@Injectable()
export class PermissionPageRepositoryTypeOrm
  implements PermissionPagesRepository
{
  constructor(
    @InjectRepository(PermissionPagesEntity)
    private readonly permissionPagesRepository: Repository<PermissionPagesEntity>,
  ) {}

  async create(
    data: CreatePermissionPageRequestDto,
  ): Promise<ReadPermissionPageResponseDto> {
    const permissionPageCreated =
      this.permissionPagesRepository.create(data);
    const permissionModuleSaved = await this.permissionPagesRepository.save(
      permissionPageCreated,
    );

    const permissionPageWithRelations = await this.permissionPagesRepository.findOne({
      where: { id: permissionModuleSaved.id },
      relations: {
        pages: {
          modules: true,
        },
        permissions: true,
      },
    });

    if (!permissionPageWithRelations) return {} as ReadPermissionPageResponseDto;

    return PermissionPageMapper.toDomain(permissionPageWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionPageDeleted = this.permissionPagesRepository.update(
      id,
      {
        deletedAt: new Date(),
      },
    );

    if (!permissionPageDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadPermissionPageResponseDto | null> {
    const permissionPageFounded =
      await this.permissionPagesRepository.findOne({
        where: {
          id,
          deletedAt: undefined,
        },
        relations: {
          pages: {
            modules: true,
          },
          permissions: true,
        },
      });

    if (!permissionPageFounded) {
      return null;
    }

    return PermissionPageMapper.toDomain(permissionPageFounded);
  }

  async list(
    filters: FilterListPermissionPageRequestDto,
  ): Promise<ListPermissionPagesResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<PermissionPagesEntity> = {
      id: 'ASC',
    };

    let where:
      | FindOptionsWhere<PermissionPagesEntity>
      | FindOptionsWhere<PermissionPagesEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.pageId) {
      where.pageId = Equal(filters.pageId);
    }

    if (filters.permissionId) {
      where.permissionId = Equal(filters.permissionId);
    }

    const [result, total] = await this.permissionPagesRepository.findAndCount(
      {
        where,
        skip,
        take,
        order,
        relations: {
          pages: {
            modules: true,
          },
          permissions: true,
        },
      },
    );

    return {
      total,
      permissionPages: result.map(PermissionPageMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreatePermissionPageRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionModuleUpdated = this.permissionPagesRepository.update(
      id,
      data,
    );

    if (!permissionModuleUpdated) {
      return null;
    }

    return { success: true };
  }
}
