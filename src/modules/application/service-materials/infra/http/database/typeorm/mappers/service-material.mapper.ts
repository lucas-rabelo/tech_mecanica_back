import type { ServiceMaterialsEntity } from '@/src/infra';
import type {
  CreateServiceMaterialRequestDto,
  ReadServiceMaterialResponseDto,
  UpdateServiceMaterialRequestDto,
} from '@/src/modules/application/service-materials/dtos';

export class ServiceMaterialMapper {
  static toDatabase(data: CreateServiceMaterialRequestDto | UpdateServiceMaterialRequestDto) {}

  static toDomain(raw: ServiceMaterialsEntity): ReadServiceMaterialResponseDto {
    return {
      id: raw.id,
      quantity: raw.quantity,
      service: raw.service ? {
        id: raw.service.id,
        name: raw.service.name,
        description: raw.service.description,
        price: raw.service.price,
        createdAt: raw.createdAt.toISOString(),
        updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
      } : null,
      stock: raw.stock ? {
        id: raw.stock.id,
        name: raw.stock.name,
        barcode: raw.stock.barcode,
        currentQuantity : raw.stock.currentQuantity,
        unit: raw.stock.unit,
        isActive: raw.stock.isActive,
        location: raw.stock.location,
        minQuantity: raw.stock.minQuantity,
        sku: raw.stock.sku,
        notes: raw.stock.notes,
        createdAt: raw.createdAt.toISOString(),
        updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
      } : null,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
