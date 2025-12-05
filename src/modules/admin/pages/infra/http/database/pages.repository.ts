import { DeletedAndUpdatedDataResponseDto } from '@/src/infra/docs';
import {
  CreatePageRequestDto,
  FilterListPageRequestDto,
  ListPagesResponseDto,
  ReadPageResponseDto,
} from '../../../dtos';

export abstract class PagesRepository {
  abstract create(
    data: CreatePageRequestDto,
  ): Promise<ReadPageResponseDto>;
  abstract findById(id: number): Promise<ReadPageResponseDto | null>;
  abstract update(
    id: number,
    data: CreatePageRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListPageRequestDto,
  ): Promise<ListPagesResponseDto>;
}
