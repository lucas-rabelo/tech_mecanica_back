import { Injectable } from '@nestjs/common';
import {
  FilterListPageRequestDto,
  ListPagesResponseDto,
} from '../../dtos';
import { PagesRepository } from '../../infra';

@Injectable()
export class ListPageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(
    request: FilterListPageRequestDto,
  ): Promise<ListPagesResponseDto> {
    try {
      const pagesFounded = await this.pagesRepository.list(request);

      return pagesFounded;
    } catch (err) {
      throw err;
    }
  }
}
