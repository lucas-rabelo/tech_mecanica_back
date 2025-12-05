import { Injectable } from '@nestjs/common';
import {
  CreateModuleRequestDto,
  ReadModuleResponseDto,
} from '../../dtos';
import { ModulesRepository } from '../../infra';

@Injectable()
export class CreateModuleUseCase {
  constructor(private readonly modulesRepository: ModulesRepository) {}

  async execute(
    request: CreateModuleRequestDto,
  ): Promise<ReadModuleResponseDto> {
    return this.modulesRepository.create(request);
  }
}
