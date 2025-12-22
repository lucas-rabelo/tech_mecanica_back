import { Injectable } from '@nestjs/common';
import {
  FilterListInventoryMovementsRequestDto,
  ListInventoryMovementsResponseDto,
} from '../../dtos';
import { InventoryMovementsRepository } from '../../infra';

@Injectable()
export class ListInventoryMovementUseCase {
  constructor(private readonly inventoryMovementsRepository: InventoryMovementsRepository) {}

  async execute(
    request: FilterListInventoryMovementsRequestDto,
  ): Promise<ListInventoryMovementsResponseDto> {
    try {
      const inventoryMovementsFounded = await this.inventoryMovementsRepository.list(request);

      return inventoryMovementsFounded;
    } catch (err) {
      throw err;
    }
  }
}
