import type { StockEntity } from '@/src/infra';
import type {
  CreateStockItemRequestDto,
  ReadStockItemResponseDto,
  UpdateStockItemRequestDto,
} from '@/src/modules/application/stock/dtos';

export class StockItemMapper {
  static toDatabase(data: CreateStockItemRequestDto | UpdateStockItemRequestDto) {}

  static toDomain(raw: StockEntity): ReadStockItemResponseDto {
    return {
      id: raw.id,
      currentQuantity: raw.currentQuantity,
      isActive: raw.isActive,
      location: raw.location,
      minQuantity: raw.minQuantity,
      name: raw.name,
      notes: raw.notes,
      barcode: raw.barcode,
      sku: raw.sku,
      unit: raw.unit,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
