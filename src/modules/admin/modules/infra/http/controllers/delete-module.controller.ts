import { AppController, AppDelete, DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  forwardRef,
  Inject,
  Param,
  ParseIntPipe
} from '@nestjs/common';
import { DeleteModuleUseCase } from '../../../application/use-cases';

@AppController('Modules')
export class DeleteModuleController {
  constructor(
    @Inject(forwardRef(() => DeleteModuleUseCase))
    private readonly deleteModuleUseCase: DeleteModuleUseCase) { }

  @AppDelete({
    okResponse: DeletedAndUpdatedDataResponseDto,
    requiredAccess: { module: 'Modules', page: 'DeleteModule' },
    summary: 'Deleting a module',
    path: ':id',
  })
  async handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteModuleUseCase.execute(id);
  }
}
