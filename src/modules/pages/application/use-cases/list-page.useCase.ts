import { Injectable } from '@nestjs/common';
import { PagesRepository } from '../../infra';
import { ListPageRequestDto } from '../../dto';

@Injectable()
export class ListPageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(filters: ListPageRequestDto) {
    return this.pagesRepository.list(filters);
  }
}
