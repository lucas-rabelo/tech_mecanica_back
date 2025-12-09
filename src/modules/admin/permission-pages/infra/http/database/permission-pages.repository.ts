import { DeletedAndUpdatedDataResponseDto } from '@/src/infra/docs';
import {
  CreatePermissionPageRequestDto,
  FilterListPermissionPageRequestDto,
  ListPermissionPagesResponseDto,
  ReadPermissionPageResponseDto,
} from '../../../dtos';

export abstract class PermissionPagesRepository {
  abstract create(
    data: CreatePermissionPageRequestDto,
  ): Promise<ReadPermissionPageResponseDto>;
  abstract findById(id: number): Promise<ReadPermissionPageResponseDto | null>;
  abstract update(
    id: number,
    data: CreatePermissionPageRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListPermissionPageRequestDto,
  ): Promise<ListPermissionPagesResponseDto>;
}
