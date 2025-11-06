import { Injectable } from '@nestjs/common';
import { ModuleRepository } from '../../infra';
import { ListModuleRequestDto } from '../../dto';

@Injectable()
export class ListModuleUseCase {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async execute(filters: ListModuleRequestDto) {
    return this.moduleRepository.list(filters);
  }
}
