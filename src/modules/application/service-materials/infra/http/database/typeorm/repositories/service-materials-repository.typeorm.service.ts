import {
  BaseRepositoryTypeOrm,
  DynamicFilterMap,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import { DeletedAndUpdatedDataResponseDto, ServiceMaterialsEntity } from '@/src/infra';
import {
  CreateServiceMaterialRequestDto,
  FilterListServiceMaterialsRequestDto,
  ListServiceMaterialsResponseDto,
  ReadServiceMaterialResponseDto,
} from '@/src/modules/application/service-materials/dtos';
import { Injectable } from '@nestjs/common';
import { ServiceMaterialsRepository } from '../../service-materials.repository';
import { ServiceMaterialMapper } from '../mappers';

@Injectable()
export class ServiceMaterialsRepositoryTypeOrm
  extends BaseRepositoryTypeOrm<ServiceMaterialsEntity>
  implements ServiceMaterialsRepository
{
  protected readonly entity = ServiceMaterialsEntity;
  protected override relations = ["services", "stock_items"];

  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected readonly filterConfig: DynamicFilterMap<ServiceMaterialsEntity> = {
    serviceId: {
      field: 'serviceId',
      operator: 'eq',
    },
    stockId: {
      field: 'stockId',
      operator: 'like',
    },
  };

  async create(
    data: CreateServiceMaterialRequestDto,
  ): Promise<ReadServiceMaterialResponseDto> {
    const repository = await this.getRepository<ServiceMaterialsEntity>(this.entity);

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
    });

    const saved = await repository.save(entity);

    return ServiceMaterialMapper.toDomain(saved);
  }

  async update(
    id: number,
    data: CreateServiceMaterialRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const repository = await this.getRepository<ServiceMaterialsEntity>(this.entity);

    const entity = await this.findActiveById(id);
    if (!entity) return null;

    Object.assign(entity, {
      ...data,
      updatedBy: this.userId,
    });

    await repository.save(entity);

    return { success: true };
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const success = await this.softDelete(id);

    if (!success) return null;

    return { success: true };
  }

  async findById(id: number): Promise<ReadServiceMaterialResponseDto | null> {
    const entity = await this.findActiveById(id);

    if (!entity) return null;

    return ServiceMaterialMapper.toDomain(entity);
  }

  async list(
    filters: FilterListServiceMaterialsRequestDto,
  ): Promise<ListServiceMaterialsResponseDto> {
    const { data, total } = await this.paginateWithFilters({
      filters,
      filterConfig: this.filterConfig,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      order: { id: 'ASC' },
    });

    return {
      total,
      serviceMaterials: data.map(ServiceMaterialMapper.toDomain),
    };
  }
}
