import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { StockItemsRepository } from '../../infra';

@Injectable()
export class DeleteStockItemUseCase {
  constructor(private readonly stockItemsRepository: StockItemsRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const stockItemDeleted = await this.stockItemsRepository.delete(id);

      if (!stockItemDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return stockItemDeleted;
    } catch (err) {
      throw err;
    }
  }
}
