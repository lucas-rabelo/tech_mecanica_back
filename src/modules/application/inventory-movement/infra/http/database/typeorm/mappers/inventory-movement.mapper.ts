import { InventoryMovementEntity } from '@/src/infra';
import {
  CreateInventoryMovementRequestDto,
  ReadInventoryMovementResponseDto,
} from '@/src/modules/application/inventory-movement/dtos';

export class InventoryMovementMapper {
  static toDatabase(data: CreateInventoryMovementRequestDto) {}

  static toDomain(raw: InventoryMovementEntity): ReadInventoryMovementResponseDto {
    return {
      id: raw.id,
      stockItemId: raw.stockItemId,
      type: raw.type,
      quantity: raw.quantity,
      balanceAfter: raw.balanceAfter,
      reason: raw.reason,
      description: raw.description,
      referenceType: raw.referenceType,
      createdAt: raw.createdAt.toISOString(),
      createdBy: raw.createdBy ? raw.createdBy : undefined,
    };
  }
}
