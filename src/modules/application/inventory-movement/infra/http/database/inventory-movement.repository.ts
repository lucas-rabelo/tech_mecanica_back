import {
  CreateInventoryMovementRequestDto,
  FilterListInventoryMovementsRequestDto,
  ListInventoryMovementsResponseDto,
  ReadInventoryMovementResponseDto,
} from '../../../dtos';

export abstract class InventoryMovementsRepository {
  abstract create(
    data: CreateInventoryMovementRequestDto,
  ): Promise<ReadInventoryMovementResponseDto>;
  abstract findById(id: number): Promise<ReadInventoryMovementResponseDto | null>;
  abstract list(
    filters: FilterListInventoryMovementsRequestDto,
  ): Promise<ListInventoryMovementsResponseDto>;
}
