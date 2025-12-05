import { PagesEntity } from '@/src/infra';
import {
  CreatePageRequestDto,
  ReadPageResponseDto,
} from '@/src/modules/admin/pages/dtos';

export class PageMapper {
  static toDatabase(data: CreatePageRequestDto) {
    return {
      name: data.name,
      module: {
        id: data.moduleId,
      },
    };
  }

  static toDomain(raw: PagesEntity): ReadPageResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      module: {
        id: raw.modules.id,
        name: raw.modules.name,
        createdAt: raw.modules.createdAt.toISOString(),
        updatedAt: raw.modules.updatedAt
          ? raw.modules.updatedAt.toISOString()
          : null,
      },
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
