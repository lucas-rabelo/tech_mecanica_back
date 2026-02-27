import { ServicesEntity } from '@/src/infra';
import {
  CreateServiceRequestDto,
  ReadServiceResponseDto,
  UpdateServiceRequestDto,
} from '@/src/modules/application/services/dtos';

export class ServiceMapper {
  static toDatabase(data: CreateServiceRequestDto | UpdateServiceRequestDto) {}

  static toDomain(raw: ServicesEntity): ReadServiceResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      price: raw.price ?? undefined,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
