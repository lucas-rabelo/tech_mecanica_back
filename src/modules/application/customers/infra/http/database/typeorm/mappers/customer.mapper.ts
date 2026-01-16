import { CustomerType } from '@/src/core';
import type { CustomerEntity } from '@/src/infra';
import type {
  CreateCustomerRequestDto,
  ReadCustomerResponseDto,
  UpdateCustomerRequestDto,
} from '@/src/modules/application/customers/dtos';

export class CustomerMapper {
  static toDatabase(
    data: CreateCustomerRequestDto | UpdateCustomerRequestDto,
  ) {}

  static toDomain(raw: CustomerEntity): ReadCustomerResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      email: raw.email,
      phone: raw.phone,
      isWhatsapp: raw.isWhatsapp,
      document: raw.document,
      customerType: CustomerType[raw.customerType],
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
