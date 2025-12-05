import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadModuleResponseDto } from '../../dtos';
import { ModulesRepository } from '../../infra';

@Injectable()
export class FindByIdModuleUseCase {
  constructor(private readonly modulesRepository: ModulesRepository) {}

  async execute(id: number): Promise<ReadModuleResponseDto> {
    try {
      const moduleFounded = await this.modulesRepository.findById(id);

      if (!moduleFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return moduleFounded;
    } catch (err) {
      throw err;
    }
  }
}
