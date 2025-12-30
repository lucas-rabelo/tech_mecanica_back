import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateServiceMaterialRequestDto } from '../../dtos';
import { ServiceMaterialsRepository } from '../../infra';
import { FindByIdServiceMaterialUseCase } from './find-by-id-service-material.use-case';

@Injectable()
export class UpdateServiceMaterialUseCase {
  constructor(
    private readonly serviceMaterialsRepository: ServiceMaterialsRepository,
    private readonly findByIdServiceMaterialUseCase: FindByIdServiceMaterialUseCase,
  ) {}

  async execute(
    id: number,
    request: UpdateServiceMaterialRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdServiceMaterialUseCase.execute(id);

      const serviceMaterialUpdated = await this.serviceMaterialsRepository.update(
        id,
        request,
      );

      if (!serviceMaterialUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return serviceMaterialUpdated;
    } catch (err) {
      throw err;
    }
  }
}
