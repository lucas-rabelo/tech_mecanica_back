import { Injectable } from '@nestjs/common';
import { CreateModuleRequestDto } from '../../dto';
import { ModuleRepository } from '../../infra';

@Injectable()
export class CreateModuleUseCase {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async execute(request: CreateModuleRequestDto) {
    return this.moduleRepository.create(request);
  }
}
