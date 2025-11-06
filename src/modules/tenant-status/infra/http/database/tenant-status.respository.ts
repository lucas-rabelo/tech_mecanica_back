import {
  CreateTenantStatusRequestDto,
  CreateTenantStatusResponseDto,
  ListTenantStatusRequestDto,
} from '../../../dto';

export abstract class TenantStatusRepository {
  abstract findById(id: number): Promise<CreateTenantStatusResponseDto | null>;
  abstract create(data: CreateTenantStatusRequestDto): Promise<CreateTenantStatusResponseDto>;
  abstract update(
    id: number,
    data: CreateTenantStatusRequestDto,
  ): Promise<CreateTenantStatusResponseDto>;
  abstract delete(id: number): Promise<CreateTenantStatusResponseDto>;
  abstract list(
    filters: ListTenantStatusRequestDto,
  ): Promise<CreateTenantStatusResponseDto[]>;
}
