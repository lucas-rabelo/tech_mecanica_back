import { Injectable } from '@nestjs/common';
import {
  CreatePageRequestDto,
  ListPageRequestDto,
  ListPageResponseDto,
  ReadPageResponseDto,
} from '../../../dto';

@Injectable()
export abstract class PagesRepository {
  abstract create(data: CreatePageRequestDto): Promise<ReadPageResponseDto>;
  abstract update(
    id: number,
    data: CreatePageRequestDto,
  ): Promise<ReadPageResponseDto>;
  abstract findById(id: number): Promise<ReadPageResponseDto | null>;
  abstract list(filters: ListPageRequestDto): Promise<ListPageResponseDto>;
  abstract delete(id: number): Promise<ReadPageResponseDto>;
}
