import { AppController, AppGet } from '@/src/infra';
import {
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { FindByIdModuleUseCase } from '../../../application/use-cases';
import { ReadModuleResponseDto } from '../../../dtos';

@AppController('Modules')
export class FindByIdModuleController {
  constructor(private readonly findByIdModuleUseCase: FindByIdModuleUseCase) { }

  @AppGet({
    path: ':id',
    requiredAccess: { module: 'Modules', page: 'FindModule' },
    summary: 'Finding a module by ID',
    okResponse: ReadModuleResponseDto,
  })
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdModuleUseCase.execute(id);
  }
}
