import {
  GetConnectionService,
  RequestContextService,
  TenantConnectionService,
} from '@/src/core';
import { CustomerEntity, DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateCustomerRequestDto,
  FilterListCustomersRequestDto,
  ListCustomersResponseDto,
  ReadCustomerResponseDto,
} from '@/src/modules/application/customers/dtos';
import { Injectable } from '@nestjs/common';
import {
  Equal,
  FindOptionsOrder,
  FindOptionsWhere,
  IsNull,
  Like,
} from 'typeorm';
import { CustomersRepository } from '../../customers.repository';
import { CustomerMapper } from '../mappers';

@Injectable()
export class CustomerRepositoryTypeOrm
  extends GetConnectionService
  implements CustomersRepository
{
  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  async create(
    data: CreateCustomerRequestDto,
  ): Promise<ReadCustomerResponseDto> {
    const customersRepository = await this.getRepository(CustomerEntity);

    const customerCreated = customersRepository.create(data);
    const customerSaved = await customersRepository.save(customerCreated);

    const customerWithRelations = await customersRepository.findOne({
      where: { id: customerSaved.id },
    });

    if (!customerWithRelations) return {} as ReadCustomerResponseDto;

    return CustomerMapper.toDomain(customerWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const customersRepository = await this.getRepository(CustomerEntity);

    const customerDeleted = customersRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!customerDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadCustomerResponseDto | null> {
    const customersRepository = await this.getRepository(CustomerEntity);

    const customerFounded = await customersRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
    });

    if (!customerFounded) {
      return null;
    }

    return CustomerMapper.toDomain(customerFounded);
  }

  async list(
    filters: FilterListCustomersRequestDto,
  ): Promise<ListCustomersResponseDto> {
    const customersRepository = await this.getRepository(CustomerEntity);

    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<CustomerEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<CustomerEntity>
      | FindOptionsWhere<CustomerEntity>[] = {
      deletedAt: IsNull(),
    };

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.email) {
      where.email = Like(`%${filters.email}%`);
    }

    if (filters.document) {
      where.document = Like(`%${filters.document}%`);
    }

    if (filters.customerType) {
      where.customerType = Equal(filters.customerType);
    }

    console.log({where});

    const [result, total] = await customersRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      customers: result.map(CustomerMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreateCustomerRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const customersRepository = await this.getRepository(CustomerEntity);

    const customerUpdated = customersRepository.update(id, data);

    if (!customerUpdated) {
      return null;
    }

    return { success: true };
  }
}
