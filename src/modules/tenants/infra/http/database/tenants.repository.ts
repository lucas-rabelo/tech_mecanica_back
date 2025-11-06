import {
  CreateTenantRequestDto,
  FindByIdTenantResponseDto,
  ListTenantRequestDto,
  ListTenantResponseDto
} from '../../../dto';

export abstract class TenantsRepository {
  abstract findById(id: number): Promise<FindByIdTenantResponseDto | null>;
  abstract findByTenantStatusId(
    tenantStatusId: number,
  ): Promise<FindByIdTenantResponseDto | null>;
  abstract create(
    tenant: CreateTenantRequestDto,
  ): Promise<FindByIdTenantResponseDto>;
  abstract delete(id: number): Promise<FindByIdTenantResponseDto | null>;
  abstract list(filters: ListTenantRequestDto): Promise<ListTenantResponseDto>;
  abstract update(
    id: number,
    data: CreateTenantRequestDto,
  ): Promise<FindByIdTenantResponseDto>;
}
