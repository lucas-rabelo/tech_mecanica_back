import { AppController, AppGet } from '@/src/infra';
import {
  forwardRef,
  Inject,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { FindByIdModuleUseCase } from '../../../application/use-cases';
import { ReadModuleResponseDto } from '../../../dtos';

@AppController('Modules')
export class FindByIdModuleController {
  constructor(
    @Inject(forwardRef(() => FindByIdModuleUseCase))
    private readonly findByIdModuleUseCase: FindByIdModuleUseCase
  ) { }

  @AppGet({
    path: ':id',
    requiredAccess: { module: 'Modules', page: 'FindModule' },
    summary: 'Finding a module by ID',
    okResponse: ReadModuleResponseDto,
  })
  async handle(@Param('id', ParseIntPipe) id: number) {
    return this.findByIdModuleUseCase.execute(id);
  }
}
