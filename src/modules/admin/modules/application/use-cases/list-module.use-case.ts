import { Injectable } from '@nestjs/common';
import {
  FilterListModuleRequestDto,
  ListModulesResponseDto,
} from '../../dtos';
import { ModulesRepository } from '../../infra';
import { BaseUseCase } from '@/src/core';

@Injectable()
export class ListModuleUseCase extends BaseUseCase<
  FilterListModuleRequestDto,
  ListModulesResponseDto,
  ModulesRepository
> {
  constructor(protected readonly repository: ModulesRepository) {
    super(repository);
  }

  async execute(
    request: FilterListModuleRequestDto,
  ): Promise<ListModulesResponseDto> {
    try {
      const modulesFounded = await this.repository.list(request);

      return modulesFounded;
    } catch (err) {
      throw err;
    }
  }
}
