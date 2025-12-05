import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePageRequestDto } from '../../dtos';
import { PagesRepository } from '../../infra';
import { FindByIdPageUseCase } from './find-by-id-page.use-case';

@Injectable()
export class UpdatePageUseCase {
  constructor(
    private readonly pagesRepository: PagesRepository,
    private readonly findByIdPageUseCase: FindByIdPageUseCase,
  ) {}

  async execute(
    id: number,
    request: CreatePageRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdPageUseCase.execute(id);

      const pageUpdated = await this.pagesRepository.update(
        id,
        request,
      );

      if (!pageUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return pageUpdated;
    } catch (err) {
      throw err;
    }
  }
}
