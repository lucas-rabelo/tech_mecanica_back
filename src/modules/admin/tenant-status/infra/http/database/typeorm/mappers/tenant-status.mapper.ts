import { TenantStatusEntity } from '@/src/infra';
import {
  CreateTenantStatusRequestDto,
  ReadTenantStatusResponseDto,
} from '@/src/modules/admin/tenant-status/dtos';

export class TenantStatusMapper {
  static toDatabase(data: CreateTenantStatusRequestDto) {
    return {};
  }

  static toDomain(raw: TenantStatusEntity): ReadTenantStatusResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
