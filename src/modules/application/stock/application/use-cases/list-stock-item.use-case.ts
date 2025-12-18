import { Injectable } from '@nestjs/common';
import {
  FilterListStockItemsRequestDto,
  ListStockItemsResponseDto,
} from '../../dtos';
import { StockItemsRepository } from '../../infra';

@Injectable()
export class ListStockItemUseCase {
  constructor(private readonly stockItemsRepository: StockItemsRepository) {}

  async execute(
    request: FilterListStockItemsRequestDto,
  ): Promise<ListStockItemsResponseDto> {
    try {
      const stockItemsFounded = await this.stockItemsRepository.list(request);

      return stockItemsFounded;
    } catch (err) {
      throw err;
    }
  }
}
