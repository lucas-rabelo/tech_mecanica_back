import {
  BaseRepositoryTypeOrm,
  DynamicFilterMap,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import { DeletedAndUpdatedDataResponseDto, StockEntity } from '@/src/infra';
import {
  CreateStockItemRequestDto,
  FilterListStockItemsRequestDto,
  ListStockItemsResponseDto,
  ReadStockItemResponseDto,
} from '@/src/modules/application/stock/dtos';
import { Injectable } from '@nestjs/common';
import { StockItemsRepository } from '../../stock.repository';
import { StockItemMapper } from '../mappers';

@Injectable()
export class StockItemRepositoryTypeOrm
  extends BaseRepositoryTypeOrm<StockEntity>
  implements StockItemsRepository
{
  protected readonly entity = StockEntity;
  protected override relations = [];

  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected readonly filterConfig: DynamicFilterMap<StockEntity> = {
    id: {
      field: 'id',
      operator: 'eq',
    },
    name: {
      field: 'name',
      operator: 'like',
    },
    sku: {
      field: 'sku',
      operator: 'eq',
    },
    unit: {
      field: 'unit',
      operator: 'like',
    },
    isActive: {
      field: 'isActive',
      operator: 'eq',
      transform: (isActiveValue: string) => {
        if(isActiveValue === 'true') return true;
        return false;
      }
    },
  };

  async create(
    data: CreateStockItemRequestDto,
  ): Promise<ReadStockItemResponseDto> {
    const repository = await this.getRepository<StockEntity>(this.entity);

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
    });

    const saved = await repository.save(entity);

    return StockItemMapper.toDomain(saved);
  }

  async update(
    id: number,
    data: CreateStockItemRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const repository = await this.getRepository<StockEntity>(this.entity);

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

  async findById(id: number): Promise<ReadStockItemResponseDto | null> {
    const entity = await this.findActiveById(id);

    if (!entity) return null;

    return StockItemMapper.toDomain(entity);
  }

  async list(
    filters: FilterListStockItemsRequestDto,
  ): Promise<ListStockItemsResponseDto> {
    const { data, total } = await this.paginateWithFilters({
      filters,
      filterConfig: this.filterConfig,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      order: { id: 'ASC' },
    });

    return {
      total,
      stockItems: data.map(StockItemMapper.toDomain),
    };
  }
}
