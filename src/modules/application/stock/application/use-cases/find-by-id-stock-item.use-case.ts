import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadStockItemResponseDto } from '../../dtos';
import { StockItemsRepository } from '../../infra';

@Injectable()
export class FindByIdStockItemUseCase {
  constructor(private readonly stockItemsRepository: StockItemsRepository) {}

  async execute(id: number): Promise<ReadStockItemResponseDto> {
    try {
      const stockItemFounded = await this.stockItemsRepository.findById(id);

      if (!stockItemFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return stockItemFounded;
    } catch (err) {
      throw err;
    }
  }
}
