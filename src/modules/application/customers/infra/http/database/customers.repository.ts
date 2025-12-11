import type { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import type {
  CreateCustomerRequestDto,
  FilterListCustomersRequestDto,
  ListCustomersResponseDto,
  ReadCustomerResponseDto,
  UpdateCustomerRequestDto,
} from '../../../dtos';

export abstract class CustomersRepository {
  abstract create(
    data: CreateCustomerRequestDto,
  ): Promise<ReadCustomerResponseDto>;
  abstract findById(id: number): Promise<ReadCustomerResponseDto | null>;
  abstract update(
    id: number,
    data: UpdateCustomerRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListCustomersRequestDto,
  ): Promise<ListCustomersResponseDto>;
}
