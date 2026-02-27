import { AppController, AppPut, DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  Body,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { UpdateModuleUseCase } from '../../../application/use-cases';
import {
  CreateModuleRequestDto,
} from '../../../dtos';

@AppController('Modules')
export class UpdateModuleController {
  constructor(
    private readonly updateModuleUseCase: UpdateModuleUseCase,
  ) { }

  @AppPut({
    path: ':id',
    requiredAccess: { module: 'Modules', page: 'UpdateModule' },
    summary: 'Updating a module',
    okResponse: DeletedAndUpdatedDataResponseDto
  })
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateModuleRequestDto,
  ) {
    return await this.updateModuleUseCase.execute({ id, data: body });
  }
}