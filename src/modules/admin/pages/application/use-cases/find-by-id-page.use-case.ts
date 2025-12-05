import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadPageResponseDto } from '../../dtos';
import { PagesRepository } from '../../infra';

@Injectable()
export class FindByIdPageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(id: number): Promise<ReadPageResponseDto> {
    try {
      const pageFounded = await this.pagesRepository.findById(id);

      if (!pageFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return pageFounded;
    } catch (err) {
      throw err;
    }
  }
}
