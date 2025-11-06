import { Injectable } from '@nestjs/common';
import { ModuleRepository } from '../../infra';

@Injectable()
export class FindByIdModuleUseCase {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async execute(id: number) {
    return this.moduleRepository.findById(id);
  }
}
