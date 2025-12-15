import {
  BaseRepositoryTypeOrm,
  DynamicFilterMap,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import {
  CustomerEntity,
  DeletedAndUpdatedDataResponseDto,
} from '@/src/infra';
import {
  CreateCustomerRequestDto,
  FilterListCustomersRequestDto,
  ListCustomersResponseDto,
  ReadCustomerResponseDto,
} from '@/src/modules/application/customers/dtos';
import { Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../customers.repository';
import { CustomerMapper } from '../mappers';

@Injectable()
export class CustomerRepositoryTypeOrm
  extends BaseRepositoryTypeOrm<CustomerEntity>
  implements CustomersRepository
{
  protected readonly entity = CustomerEntity;
  
  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected readonly filterConfig: DynamicFilterMap<CustomerEntity> =
  {
    name: {
      field: 'name',
      operator: 'like',
    },
    email: {
      field: 'email',
      operator: 'like',
    },
    document: {
      field: 'document',
      operator: 'like',
    },
    customerType: {
      field: 'customerType',
      operator: 'eq',
    },
  };

  async create(
    data: CreateCustomerRequestDto,
  ): Promise<ReadCustomerResponseDto> {
    const repository = await this.getRepository<CustomerEntity>(this.entity);

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
    });

    const saved = await repository.save(entity);

    return CustomerMapper.toDomain(saved);
  }

  async update(
    id: number,
    data: CreateCustomerRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const repository = await this.getRepository<CustomerEntity>(this.entity);

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
  ): Promise<ReadCustomerResponseDto | null> {
    const entity = await this.findActiveById(id);

    if (!entity) return null;

    return CustomerMapper.toDomain(entity);
  }

  async list(
    filters: FilterListCustomersRequestDto,
  ): Promise<ListCustomersResponseDto> {
    const { data, total } = await this.paginateWithFilters({
      filters,
      filterConfig: this.filterConfig,
      page: filters.page,
      itemsPerPage: filters.itemsPerPage,
      order: { id: 'ASC' },
    });

    return {
      total,
      customers: data.map(CustomerMapper.toDomain),
    };
  }
}
