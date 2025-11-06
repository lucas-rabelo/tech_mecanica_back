import { Injectable } from '@nestjs/common';
import { PagesRepository } from '../../infra';

@Injectable()
export class FindByIdPageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(id: number) {
    return this.pagesRepository.findById(id);
  }
}
