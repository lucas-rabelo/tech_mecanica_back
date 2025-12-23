import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateServiceRequestDto } from '../../dtos';
import { ServicesRepository } from '../../infra';
import { FindByIdServiceUseCase } from './find-by-id-service.use-case';

@Injectable()
export class UpdateServiceUseCase {
  constructor(
    private readonly servicesRepository: ServicesRepository,
    private readonly findByIdServiceUseCase: FindByIdServiceUseCase,
  ) {}

  async execute(
    id: number,
    request: UpdateServiceRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdServiceUseCase.execute(id);

      const serviceUpdated = await this.servicesRepository.update(
        id,
        request,
      );

      if (!serviceUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return serviceUpdated;
    } catch (err) {
      throw err;
    }
  }
}
