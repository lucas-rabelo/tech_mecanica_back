import {
  DeletedAndUpdatedDataResponseDto,
  PermissionModulesEntity,
} from '@/src/infra';
import {
  CreatePermissionModuleRequestDto,
  FilterListPermissionModuleRequestDto,
  ListPermissionModulesResponseDto,
  ReadPermissionModuleResponseDto,
} from '@/src/modules/admin/permission-modules/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { PermissionModulesRepository } from '../../permission-modules.repository';
import { PermissionModuleMapper } from '../mappers';

@Injectable()
export class PermissionModuleRepositoryTypeOrm
  implements PermissionModulesRepository
{
  constructor(
    @InjectRepository(PermissionModulesEntity)
    private readonly permissionModulesRepository: Repository<PermissionModulesEntity>,
  ) {}

  async create(
    data: CreatePermissionModuleRequestDto,
  ): Promise<ReadPermissionModuleResponseDto> {
    const permissionModuleCreated =
      this.permissionModulesRepository.create(data);
    const permissionModuleSaved = await this.permissionModulesRepository.save(
      permissionModuleCreated,
    );

    const pageWithRelations = await this.permissionModulesRepository.findOne({
      where: { id: permissionModuleSaved.id },
      relations: {
        modules: true,
        permissions: true,
      },
    });

    if (!pageWithRelations) return {} as ReadPermissionModuleResponseDto;

    return PermissionModuleMapper.toDomain(pageWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionModuleDeleted = this.permissionModulesRepository.update(
      id,
      {
        deletedAt: new Date(),
      },
    );

    if (!permissionModuleDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadPermissionModuleResponseDto | null> {
    const permissionModuleFounded =
      await this.permissionModulesRepository.findOne({
        where: {
          id,
          deletedAt: undefined,
        },
        relations: {
          modules: true,
          permissions: true,
        },
      });

    if (!permissionModuleFounded) {
      return null;
    }

    return PermissionModuleMapper.toDomain(permissionModuleFounded);
  }

  async list(
    filters: FilterListPermissionModuleRequestDto,
  ): Promise<ListPermissionModulesResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<PermissionModulesEntity> = {
      id: 'ASC',
    };

    let where:
      | FindOptionsWhere<PermissionModulesEntity>
      | FindOptionsWhere<PermissionModulesEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.moduleId) {
      where.moduleId = Equal(filters.moduleId);
    }

    if (filters.permissionId) {
      where.permissionId = Equal(filters.permissionId);
    }

    const [result, total] = await this.permissionModulesRepository.findAndCount(
      {
        where,
        skip,
        take,
        order,
        relations: {
          modules: true,
          permissions: true,
        },
      },
    );

    return {
      total,
      permissionModules: result.map(PermissionModuleMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreatePermissionModuleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionModuleUpdated = this.permissionModulesRepository.update(
      id,
      data,
    );

    if (!permissionModuleUpdated) {
      return null;
    }

    return { success: true };
  }
}
