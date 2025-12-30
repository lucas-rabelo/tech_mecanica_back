import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ServiceMaterialsRepository } from '../../infra';

@Injectable()
export class DeleteServiceMaterialUseCase {
  constructor(private readonly serviceMaterialsRepository: ServiceMaterialsRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const serviceMaterialDeleted = await this.serviceMaterialsRepository.delete(id);

      if (!serviceMaterialDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return serviceMaterialDeleted;
    } catch (err) {
      throw err;
    }
  }
}
