import { AppController, AppGet } from '@/src/infra';
import { Query } from '@nestjs/common';
import { ListModuleUseCase } from '../../../application/use-cases';
import {
  FilterListModuleRequestDto,
  ListModulesResponseDto,
} from '../../../dtos';

@AppController('Modules')
export class ListModuleController {
  constructor(
    private readonly listModuleUseCase: ListModuleUseCase,
  ) { }

  @AppGet({
    requiredAccess: { module: 'Modules', page: 'ListModule' },
    summary: 'List of modules',
    okResponse: ListModulesResponseDto,
  })
  async handle(@Query() filters: FilterListModuleRequestDto) {
    return await this.listModuleUseCase.execute(filters);
  }
}
