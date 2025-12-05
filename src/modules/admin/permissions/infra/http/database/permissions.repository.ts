import { DeletedAndUpdatedDataResponseDto } from '@/src/infra/docs';
import {
  CreatePermissionRequestDto,
  FilterListPermisssionRequestDto,
  ListPermissionsResponseDto,
  ReadPermissionResponseDto,
} from '../../../dtos';

export abstract class PermissionsRepository {
  abstract create(
    data: CreatePermissionRequestDto,
  ): Promise<ReadPermissionResponseDto>;
  abstract findById(id: number): Promise<ReadPermissionResponseDto | null>;
  abstract update(
    id: number,
    data: CreatePermissionRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListPermisssionRequestDto,
  ): Promise<ListPermissionsResponseDto>;
}
