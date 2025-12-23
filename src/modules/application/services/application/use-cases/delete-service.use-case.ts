import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ServicesRepository } from '../../infra';

@Injectable()
export class DeleteServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const serviceDeleted = await this.servicesRepository.delete(id);

      if (!serviceDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return serviceDeleted;
    } catch (err) {
      throw err;
    }
  }
}
