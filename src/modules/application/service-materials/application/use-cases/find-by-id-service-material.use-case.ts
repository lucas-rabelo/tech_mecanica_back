import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadServiceMaterialResponseDto } from '../../dtos';
import { ServiceMaterialsRepository } from '../../infra';

@Injectable()
export class FindByIdServiceMaterialUseCase {
  constructor(private readonly serviceMaterialsRepository: ServiceMaterialsRepository) {}

  async execute(id: number): Promise<ReadServiceMaterialResponseDto> {
    try {
      const serviceMaterialFounded = await this.serviceMaterialsRepository.findById(id);

      if (!serviceMaterialFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return serviceMaterialFounded;
    } catch (err) {
      throw err;
    }
  }
}
