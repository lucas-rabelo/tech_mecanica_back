import { BaseUseCase } from '@/src/core';
import { Injectable } from '@nestjs/common';
import {
  CreateModuleRequestDto,
  ReadModuleResponseDto,
} from '../../dtos';
import { ModulesRepository } from '../../infra';

@Injectable()
export class CreateModuleUseCase extends BaseUseCase<
  CreateModuleRequestDto, 
  ReadModuleResponseDto, 
  ModulesRepository
> {
  constructor(protected readonly repository: ModulesRepository) {
    super(repository);
  }

  async execute(
    request: CreateModuleRequestDto,
  ): Promise<ReadModuleResponseDto> {
    return this.repository.create(request);
  }
}
