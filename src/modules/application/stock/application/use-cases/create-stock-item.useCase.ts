import { Injectable } from '@nestjs/common';
import { CreateStockItemRequestDto } from '../../dtos';
import { StockItemsRepository } from '../../infra';

@Injectable()
export class CreateStockItemUseCase {
  constructor(private readonly stockItemsRepository: StockItemsRepository) {}

  async execute(data: CreateStockItemRequestDto) {
    return this.stockItemsRepository.create(data);
  }
}
