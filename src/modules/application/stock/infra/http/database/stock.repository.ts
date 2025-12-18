import type { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import type {
  CreateStockItemRequestDto,
  FilterListStockItemsRequestDto,
  ListStockItemsResponseDto,
  ReadStockItemResponseDto,
  UpdateStockItemRequestDto,
} from '../../../dtos';

export abstract class StockItemsRepository {
  abstract create(
    data: CreateStockItemRequestDto,
  ): Promise<ReadStockItemResponseDto>;
  abstract findById(id: number): Promise<ReadStockItemResponseDto | null>;
  abstract update(
    id: number,
    data: UpdateStockItemRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListStockItemsRequestDto,
  ): Promise<ListStockItemsResponseDto>;
}
