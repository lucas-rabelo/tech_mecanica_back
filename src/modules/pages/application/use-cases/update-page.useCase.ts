import { Injectable } from '@nestjs/common';
import { CreatePageRequestDto } from '../../dto';
import { PagesRepository } from '../../infra';

@Injectable()
export class UpdatePageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(id: number, request: CreatePageRequestDto) {
    return this.pagesRepository.update(id, request);
  }
}
