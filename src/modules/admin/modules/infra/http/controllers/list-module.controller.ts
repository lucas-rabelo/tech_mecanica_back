import { AppController, AppGet } from '@/src/infra';
import { forwardRef, Inject, Query } from '@nestjs/common';
import { ListModuleUseCase } from '../../../application/use-cases';
import {
  FilterListModuleRequestDto,
  ListModulesResponseDto,
} from '../../../dtos';

@AppController('Modules')
export class ListModuleController {
  constructor(
    @Inject(forwardRef(() => ListModuleUseCase))
    private readonly listModuleUseCase: ListModuleUseCase,
  ) { }

  @AppGet({
    requiredAccess: { module: 'Modules', page: 'ListModule' },
    summary: 'List of modules',
    okResponse: ListModulesResponseDto,
  })
  async handle(@Query() filters: FilterListModuleRequestDto) {
    return this.listModuleUseCase.execute(filters);
  }
}
