import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PagesRepository } from '../../infra';

@Injectable()
export class DeletePageUseCase {
  constructor(private readonly pagesRepository: PagesRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const pageDeleted = await this.pagesRepository.delete(id);

      if (!pageDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return pageDeleted;
    } catch (err) {
      throw err;
    }
  }
}
