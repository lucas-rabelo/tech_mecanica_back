import {
  CreatePermissionRequestDto,
  ListPermissionRequestDto,
  ListPermissionResponseDto,
  ReadPermissionResponseDto,
} from '../../../dto';

export abstract class PermissionsRepository {
  abstract create(
    data: CreatePermissionRequestDto,
  ): Promise<ReadPermissionResponseDto>;
  abstract findById(id: number): Promise<ReadPermissionResponseDto | null>;
  abstract list(
    filters: ListPermissionRequestDto,
  ): Promise<ListPermissionResponseDto>;
  abstract update(
    id: number,
    data: CreatePermissionRequestDto,
  ): Promise<ReadPermissionResponseDto>;
  abstract delete(id: number): Promise<ReadPermissionResponseDto>;
}
