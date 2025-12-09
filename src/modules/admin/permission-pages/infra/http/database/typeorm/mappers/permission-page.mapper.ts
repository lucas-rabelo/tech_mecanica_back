import { PermissionPagesEntity } from '@/src/infra';
import {
  CreatePermissionPageRequestDto,
  ReadPermissionPageResponseDto,
} from '@/src/modules/admin/permission-pages/dtos';

export class PermissionPageMapper {
  static toDatabase(data: CreatePermissionPageRequestDto) {
    return {};
  }

  static toDomain(raw: PermissionPagesEntity): ReadPermissionPageResponseDto {
    return {
      id: raw.id,
      permission: raw.permissions
        ? {
            id: raw.permissions.id,
            name: raw.permissions.name,
            createdAt: raw.permissions.createdAt.toISOString(),
            updatedAt: raw.permissions.updatedAt
              ? raw.permissions.updatedAt.toISOString()
              : null,
          }
        : null,
      page: raw.pages
        ? {
            id: raw.pages.id,
            name: raw.pages.name,
            module: raw.pages.modules ? {
              id: raw.pages.modules.id,
              name: raw.pages.modules.name,
              createdAt: raw.pages.modules.createdAt.toISOString(),
              updatedAt: raw.pages.modules.updatedAt
                ? raw.pages.modules.updatedAt.toISOString()
                : null,
            } : null,
            createdAt: raw.pages.createdAt.toISOString(),
            updatedAt: raw.pages.updatedAt
              ? raw.pages.updatedAt.toISOString()
              : null,
          }
        : null,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
