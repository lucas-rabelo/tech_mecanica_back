import { PermissionsEntity } from '@/src/infra';
import {
  CreatePermissionRequestDto,
  ReadPermissionResponseDto,
} from '@/src/modules/admin/permissions/dtos';

export class PermissionMapper {
  static toDatabase(data: CreatePermissionRequestDto) {
    return {};
  }

  static toDomain(raw: PermissionsEntity): ReadPermissionResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
