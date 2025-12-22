import {
  BaseRepositoryTypeOrm,
  DynamicFilterMap,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import { DeletedAndUpdatedDataResponseDto, InventoryMovementEntity } from '@/src/infra';
import {
  CreateInventoryMovementRequestDto,
  FilterListInventoryMovementsRequestDto,
  ListInventoryMovementsResponseDto,
  ReadInventoryMovementResponseDto,
} from '@/src/modules/application/inventory-movement/dtos';
import { Injectable } from '@nestjs/common';
import { InventoryMovementsRepository } from '../../inventory-movement.repository';
import { InventoryMovementMapper } from '../mappers';

@Injectable()
export class InventoryMovementRepositoryTypeOrm
  extends BaseRepositoryTypeOrm<InventoryMovementEntity>
  implements InventoryMovementsRepository
{
  protected readonly entity = InventoryMovementEntity;
  protected override relations = [];

  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected readonly filterConfig: DynamicFilterMap<InventoryMovementEntity> = {
    id: {
      field: 'id',
      operator: 'eq',
    },
    stockItemId: {
      field: 'stockItemId',
      operator: 'like',
    },
    type: {
      field: 'type',
      operator: 'eq',
    },
    reason: {
      field: 'reason',
      operator: 'like',
    },
    referenceType: {
      field: 'referenceType',
      operator: 'eq',
    },
  };

  async create(
    data: CreateInventoryMovementRequestDto,
  ): Promise<ReadInventoryMovementResponseDto> {
    const repository = await this.getRepository<InventoryMovementEntity>(this.entity);

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
    });

    const saved = await repository.save(entity);

    return InventoryMovementMapper.toDomain(saved);
  }

  async findById(id: number): Promise<ReadInventoryMovementResponseDto | null> {
    const entity = await this.findActiveById(id);

    if (!entity) return null;

    return InventoryMovementMapper.toDomain(entity);
  }

  async list(
    filters: FilterListInventoryMovementsRequestDto,
  ): Promise<ListInventoryMovementsResponseDto> {
    const { data, total } = await this.paginateWithFilters({
      filters,
      filterConfig: this.filterConfig,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      order: { id: 'ASC' },
    });

    return {
      total,
      inventoryMovements: data.map(InventoryMovementMapper.toDomain),
    };
  }
}
