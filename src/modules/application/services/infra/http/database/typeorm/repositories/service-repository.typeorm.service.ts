import {
  BaseRepositoryTypeOrm,
  DynamicFilterMap,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import {
  ServicesEntity,
  DeletedAndUpdatedDataResponseDto,
} from '@/src/infra';
import {
  CreateServiceRequestDto,
  FilterListServicesRequestDto,
  ListServicesResponseDto,
  ReadServiceResponseDto
} from '@/src/modules/application/services/dtos';
import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../../services.repository';
import { ServiceMapper } from '../mappers';

@Injectable()
export class ServiceRepositoryTypeOrm
  extends BaseRepositoryTypeOrm<ServicesEntity>
  implements ServicesRepository
{
  protected readonly entity = ServicesEntity;
  protected override relations = [];
  
  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected readonly filterConfig: DynamicFilterMap<ServicesEntity> =
  {
    name: {
      field: 'name',
      operator: 'like',
    },
  };

  async create(
    data: CreateServiceRequestDto,
  ): Promise<ReadServiceResponseDto> {
    const repository = await this.getRepository<ServicesEntity>(this.entity);

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
    });

    const saved = await repository.save(entity);

    return ServiceMapper.toDomain(saved);
  }

  async update(
    id: number,
    data: CreateServiceRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const repository = await this.getRepository<ServicesEntity>(this.entity);

    const entity = await this.findActiveById(id);
    if (!entity) return null;

    Object.assign(entity, {
      ...data,
      updatedBy: this.userId,
    });

    await repository.save(entity);

    return { success: true };
  }

  async delete(
    id: number,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const success = await this.softDelete(id);

    if (!success) return null;

    return { success: true };
  }

  async findById(
    id: number,
  ): Promise<ReadServiceResponseDto| null> {
    const entity = await this.findActiveById(id);

    if (!entity) return null;

    return ServiceMapper.toDomain(entity);
  }

  async list(
    filters: FilterListServicesRequestDto,
  ): Promise<ListServicesResponseDto> {
    const { data, total } = await this.paginateWithFilters({
      filters,
      filterConfig: this.filterConfig,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      order: { id: 'ASC' },
    });

    return {
      total,
      services: data.map(ServiceMapper.toDomain),
    };
  }
}
