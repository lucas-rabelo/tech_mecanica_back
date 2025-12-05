import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ModulesRepository } from '../../infra';

@Injectable()
export class DeleteModuleUseCase {
  constructor(private readonly modulesRepository: ModulesRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const moduleDeleted = await this.modulesRepository.delete(id);

      if (!moduleDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return moduleDeleted;
    } catch (err) {
      throw err;
    }
  }
}
