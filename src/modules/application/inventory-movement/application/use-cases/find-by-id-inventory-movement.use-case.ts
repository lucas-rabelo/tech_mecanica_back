import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadInventoryMovementResponseDto } from '../../dtos';
import { InventoryMovementsRepository } from '../../infra';

@Injectable()
export class FindByIdInventoryMovementUseCase {
  constructor(private readonly inventoryMovementsRepository: InventoryMovementsRepository) {}

  async execute(id: number): Promise<ReadInventoryMovementResponseDto> {
    try {
      const inventoryMovementFounded = await this.inventoryMovementsRepository.findById(id);

      if (!inventoryMovementFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return inventoryMovementFounded;
    } catch (err) {
      throw err;
    }
  }
}
