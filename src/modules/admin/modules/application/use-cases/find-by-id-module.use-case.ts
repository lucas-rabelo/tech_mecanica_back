import { BaseUseCase, NotFoundException } from '@/src/core';
import { Injectable } from '@nestjs/common';
import { ReadModuleResponseDto } from '../../dtos';
import { ModulesRepository } from '../../infra';

@Injectable()
export class FindByIdModuleUseCase extends BaseUseCase<number, ReadModuleResponseDto, ModulesRepository> {
  constructor(protected readonly repository: ModulesRepository) {
    super(repository);
  }

  async execute(id: number): Promise<ReadModuleResponseDto> {
    try {
      const moduleFounded = await this.repository.findById(id);

      if (!moduleFounded) {
        throw new NotFoundException();
      }

      return moduleFounded;
    } catch (err) {
      throw err;
    }
  }
}
