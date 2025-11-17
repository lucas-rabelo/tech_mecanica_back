import {
  DeletedAndUpdatedDataResponseDto,
  PermissionsEntity,
} from '@/src/infra';
import {
  CreatePermissionRequestDto,
  FilterListPermisssionRequestDto,
  ListPermissionsResponseDto,
  ReadPermissionResponseDto,
} from '@/src/modules/permissions/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { PermissionsRepository } from '../../permissions.repository';
import { PermissionMapper } from '../mappers';

@Injectable()
export class PermissionRepositoryTypeOrm implements PermissionsRepository {
  constructor(
    @InjectRepository(PermissionsEntity)
    private readonly permissionsRepository: Repository<PermissionsEntity>,
  ) {}

  async create(
    data: CreatePermissionRequestDto,
  ): Promise<ReadPermissionResponseDto> {
    const permissionCreated = this.permissionsRepository.create(data);
    const permissionSaved =
      await this.permissionsRepository.save(permissionCreated);
    return PermissionMapper.toDomain(permissionSaved);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionDeleted = this.permissionsRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!permissionDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadPermissionResponseDto | null> {
    const permissionFounded = await this.permissionsRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
    });

    if (!permissionFounded) {
      return null;
    }

    return PermissionMapper.toDomain(permissionFounded);
  }

  async list(
    filters: FilterListPermisssionRequestDto,
  ): Promise<ListPermissionsResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<PermissionsEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<PermissionsEntity>
      | FindOptionsWhere<PermissionsEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    const [result, total] = await this.permissionsRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      permissions: result.map(PermissionMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreatePermissionRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionUpdated = this.permissionsRepository.update(id, data);

    if (!permissionUpdated) {
      return null;
    }

    return { success: true };
  }
}
