import {
  DeletedAndUpdatedDataResponseDto,
  TenantStatusEntity,
} from '@/src/infra';
import {
  CreateTenantStatusRequestDto,
  FilterListTenantStatusRequestDto,
  ListTenantStatusResponseDto,
  ReadTenantStatusResponseDto,
} from '@/src/modules/tenant-status/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository, Like } from 'typeorm';
import { TenantStatusRepository } from '../../tenant-status.repository';
import { TenantStatusMapper } from '../mappers';

@Injectable()
export class TenantStatusRepositoryTypeOrm implements TenantStatusRepository {
  constructor(
    @InjectRepository(TenantStatusEntity)
    private readonly tenantStatusRepository: Repository<TenantStatusEntity>,
  ) {}

  async create(
    data: CreateTenantStatusRequestDto,
  ): Promise<ReadTenantStatusResponseDto> {
    const TenantStatusCreated = this.tenantStatusRepository.create(data);
    const TenantStatusSaved =
      await this.tenantStatusRepository.save(TenantStatusCreated);

    return TenantStatusMapper.toDomain(TenantStatusSaved);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionDeleted = this.tenantStatusRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!permissionDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadTenantStatusResponseDto | null> {
    const permissionFounded = await this.tenantStatusRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
    });

    if (!permissionFounded) {
      return null;
    }

    return TenantStatusMapper.toDomain(permissionFounded);
  }

  async list(
    filters: FilterListTenantStatusRequestDto,
  ): Promise<ListTenantStatusResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<TenantStatusEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<TenantStatusEntity>
      | FindOptionsWhere<TenantStatusEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    const [result, total] = await this.tenantStatusRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      TenantStatus: result.map(TenantStatusMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreateTenantStatusRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const TenantStatusUpdated = this.tenantStatusRepository.update(id, data);

    if (!TenantStatusUpdated) {
      return null;
    }

    return { success: true };
  }
}
