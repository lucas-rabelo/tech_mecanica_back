import { DeletedAndUpdatedDataResponseDto } from '@/src/infra/docs';
import {
  CreatePermissionModuleRequestDto,
  FilterListPermissionModuleRequestDto,
  ListPermissionModulesResponseDto,
  ReadPermissionModuleResponseDto,
} from '../../../dtos';

export abstract class PermissionModulesRepository {
  abstract create(
    data: CreatePermissionModuleRequestDto,
  ): Promise<ReadPermissionModuleResponseDto>;
  abstract findById(id: number): Promise<ReadPermissionModuleResponseDto | null>;
  abstract update(
    id: number,
    data: CreatePermissionModuleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListPermissionModuleRequestDto,
  ): Promise<ListPermissionModulesResponseDto>;
}
