import { Injectable } from '@nestjs/common';
import type { CreateStockItemRequestDto } from '../../dtos';
import { StockItemsRepository } from '../../infra';

@Injectable()
export class CreateStockItemUseCase {
  constructor(private readonly stockItemsRepository: StockItemsRepository) {}

  async execute(data: CreateStockItemRequestDto) {
    return this.stockItemsRepository.create(data);
  }
}
