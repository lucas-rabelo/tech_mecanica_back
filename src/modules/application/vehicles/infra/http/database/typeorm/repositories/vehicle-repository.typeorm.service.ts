import {
  BaseRepositoryTypeOrm,
  DynamicFilterMap,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import {
  VehiclesEntity,
  DeletedAndUpdatedDataResponseDto,
} from '@/src/infra';
import {
  CreateVehicleRequestDto,
  FilterListVehiclesRequestDto,
  ListVehiclesResponseDto,
  ReadVehicleResponseDto
} from '@/src/modules/application/vehicles/dtos';
import { Injectable } from '@nestjs/common';
import { VehiclesRepository } from '../../vehicles.repository';
import { VehicleMapper } from '../mappers';

@Injectable()
export class VehicleRepositoryTypeOrm
  extends BaseRepositoryTypeOrm<VehiclesEntity>
  implements VehiclesRepository
{
  protected readonly entity = VehiclesEntity;
  protected override relations = ['customers'];
  
  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected readonly filterConfig: DynamicFilterMap<VehiclesEntity> =
  {
    licensePlate: {
      field: 'licensePlate',
      operator: 'like',
    },
    brand: {
      field: 'brand',
      operator: 'like',
    },
    model: {
      field: 'model',
      operator: 'like',
    },
    year: {
      field: 'year',
      operator: 'like',
    },
    customerId: {
      field: 'customerId',
      operator: 'eq',
    },
  };

  async create(
    data: CreateVehicleRequestDto,
  ): Promise<ReadVehicleResponseDto> {
    const repository = await this.getRepository<VehiclesEntity>(this.entity);

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
    });

    const saved = await repository.save(entity);

    const vehicleWithRelations = await this.findActiveById(saved.id);

    if (!vehicleWithRelations) return {} as ReadVehicleResponseDto;

    return VehicleMapper.toDomain(vehicleWithRelations);
  }

  async update(
    id: number,
    data: CreateVehicleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const repository = await this.getRepository<VehiclesEntity>(this.entity);

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
  ): Promise<ReadVehicleResponseDto| null> {
    const entity = await this.findActiveById(id);

    if (!entity) return null;

    return VehicleMapper.toDomain(entity);
  }

  async list(
    filters: FilterListVehiclesRequestDto,
  ): Promise<ListVehiclesResponseDto> {
    const { data, total } = await this.paginateWithFilters({
      filters,
      filterConfig: this.filterConfig,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      order: { id: 'ASC' },
    });

    return {
      total,
      vehicles: data.map(VehicleMapper.toDomain),
    };
  }
}
