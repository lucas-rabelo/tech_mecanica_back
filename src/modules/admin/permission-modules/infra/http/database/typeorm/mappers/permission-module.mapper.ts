import { PermissionModulesEntity } from '@/src/infra';
import {
  CreatePermissionModuleRequestDto,
  ReadPermissionModuleResponseDto,
} from '@/src/modules/admin/permission-modules/dtos';

export class PermissionModuleMapper {
  static toDatabase(data: CreatePermissionModuleRequestDto) {
    return {};
  }

  static toDomain(
    raw: PermissionModulesEntity,
  ): ReadPermissionModuleResponseDto {
    return {
      id: raw.id,
      permission: raw.permissions ? {
        id: raw.permissions.id,
        name: raw.permissions.name,
        createdAt: raw.permissions.createdAt.toISOString(),
        updatedAt: raw.permissions.updatedAt
          ? raw.permissions.updatedAt.toISOString()
          : null,
      } : null,
      module: raw.modules ? {
        id: raw.modules.id,
        name: raw.modules.name,
        createdAt: raw.modules.createdAt.toISOString(),
        updatedAt: raw.modules.updatedAt
          ? raw.modules.updatedAt.toISOString()
          : null,
      } : null,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
