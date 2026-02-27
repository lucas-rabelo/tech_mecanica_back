import { AppController, AppPost } from '@/src/infra/decorators';
import { Body, forwardRef, Inject } from '@nestjs/common';
import { CreateModuleUseCase } from '../../../application/use-cases';
import {
  CreateModuleRequestDto,
  ReadModuleResponseDto,
} from '../../../dtos';

@AppController('Modules')
export class CreateModuleController {
  constructor(
    @Inject(forwardRef(() => CreateModuleUseCase))
    private readonly createModuleUseCase: CreateModuleUseCase
  ) { }

  @AppPost({
    okResponse: ReadModuleResponseDto,
    requiredAccess: { module: 'Modules', page: 'CreateModule' },
    summary: 'Creating a new module',
  })
  async handle(@Body() body: CreateModuleRequestDto) {
    return this.createModuleUseCase.execute(body);
  }
}