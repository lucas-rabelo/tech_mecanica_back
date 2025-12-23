import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadServiceResponseDto } from '../../dtos';
import { ServicesRepository } from '../../infra';

@Injectable()
export class FindByIdServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: number): Promise<ReadServiceResponseDto> {
    try {
      const serviceFounded = await this.servicesRepository.findById(id);

      if (!serviceFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return serviceFounded;
    } catch (err) {
      throw err;
    }
  }
}
