import { Injectable } from '@nestjs/common';
import type { CreateInventoryMovementRequestDto } from '../../dtos';
import { InventoryMovementsRepository } from '../../infra';

@Injectable()
export class CreateInventoryMovementUseCase {
  constructor(private readonly inventoryMovementsRepository: InventoryMovementsRepository) {}

  async execute(data: CreateInventoryMovementRequestDto) {
    return this.inventoryMovementsRepository.create(data);
  }
}
