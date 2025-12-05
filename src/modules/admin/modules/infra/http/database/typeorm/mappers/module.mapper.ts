import { ModulesEntity } from '@/src/infra';
import {
  CreateModuleRequestDto,
  ReadModuleResponseDto,
} from '@/src/modules/admin/modules/dtos';

export class ModuleMapper {
  static toDatabase(data: CreateModuleRequestDto) {
    return {};
  }

  static toDomain(raw: ModulesEntity): ReadModuleResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
