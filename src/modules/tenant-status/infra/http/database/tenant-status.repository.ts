import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateTenantStatusRequestDto,
  FilterListTenantStatusRequestDto,
  ListTenantStatusResponseDto,
  ReadTenantStatusResponseDto,
} from '../../../dtos';

export abstract class TenantStatusRepository {
  abstract create(
    data: CreateTenantStatusRequestDto,
  ): Promise<ReadTenantStatusResponseDto>;
  abstract findById(id: number): Promise<ReadTenantStatusResponseDto | null>;
  abstract update(
    id: number,
    data: CreateTenantStatusRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListTenantStatusRequestDto,
  ): Promise<ListTenantStatusResponseDto>;
}
