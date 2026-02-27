import { AppController, AppPost } from '@/src/infra/decorators';
import { Body } from '@nestjs/common';
import { CreateModuleUseCase } from '../../../application/use-cases';
import {
  CreateModuleRequestDto,
  ReadModuleResponseDto,
} from '../../../dtos';

@AppController('Modules')
export class CreateModuleController {
  constructor(
    private readonly createModuleUseCase: CreateModuleUseCase) { }

  @AppPost({
    okResponse: ReadModuleResponseDto,
    requiredAccess: { module: 'Modules', page: 'CreateModule' },
    summary: 'Creating a new module',
  })
  async handle(@Body() body: CreateModuleRequestDto) {
    return await this.createModuleUseCase.execute(body);
  }
}