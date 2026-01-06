import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateUserTenantRequestDto,
  FilterListUserTenantRequestDto,
  ListUserTenantsResponseDto,
  ReadUserTenantResponseDto,
} from '../../../dtos';

export abstract class UserTenantsRepository {
  abstract create(
    data: CreateUserTenantRequestDto,
  ): Promise<ReadUserTenantResponseDto>;
  abstract findById(id: number): Promise<ReadUserTenantResponseDto | null>;
  abstract update(
    id: number,
    data: CreateUserTenantRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListUserTenantRequestDto,
  ): Promise<ListUserTenantsResponseDto>;
}
