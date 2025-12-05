import { Injectable } from '@nestjs/common';
import {
  CreatePageRequestDto,
  ReadPageResponseDto,
} from '../../dtos';
import { PagesRepository } from '../../infra';

@Injectable()
export class CreatePageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(
    request: CreatePageRequestDto,
  ): Promise<ReadPageResponseDto> {
    return this.pagesRepository.create(request);
  }
}
