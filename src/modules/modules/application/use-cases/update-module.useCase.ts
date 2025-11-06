import { Injectable } from '@nestjs/common';
import { CreateModuleRequestDto } from '../../dto';
import { ModuleRepository } from '../../infra';

@Injectable()
export class UpdateModuleUseCase {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async execute(id: number, request: CreateModuleRequestDto) {
    return this.moduleRepository.update(id, request);
  }
}
