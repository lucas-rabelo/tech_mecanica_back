import { Injectable } from '@nestjs/common';
import {
  FilterListModuleRequestDto,
  ListModulesResponseDto,
} from '../../dtos';
import { ModulesRepository } from '../../infra';

@Injectable()
export class ListModuleUseCase {
  constructor(private readonly modulesRepository: ModulesRepository) {}

  async execute(
    request: FilterListModuleRequestDto,
  ): Promise<ListModulesResponseDto> {
    try {
      const modulesFounded = await this.modulesRepository.list(request);

      return modulesFounded;
    } catch (err) {
      throw err;
    }
  }
}
