import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateStockItemRequestDto } from '../../dtos';
import { StockItemsRepository } from '../../infra';
import { FindByIdStockItemUseCase } from './find-by-id-stock-item.use-case';

@Injectable()
export class UpdateStockItemUseCase {
  constructor(
    private readonly stockItemsRepository: StockItemsRepository,
    private readonly findByIdStockItemUseCase: FindByIdStockItemUseCase,
  ) {}

  async execute(
    id: number,
    request: UpdateStockItemRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdStockItemUseCase.execute(id);

      const stockItemUpdated = await this.stockItemsRepository.update(
        id,
        request,
      );

      if (!stockItemUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return stockItemUpdated;
    } catch (err) {
      throw err;
    }
  }
}
