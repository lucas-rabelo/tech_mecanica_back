import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Controller, Delete, forwardRef, Inject, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeletePermissionPageUseCase } from '../../../application/use-cases';

@ApiTags('Permission Pages')
@Controller('permission-pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeletePermissionPagesController {
  constructor(
    @Inject(forwardRef(() => DeletePermissionPageUseCase))
    private readonly deletePermissionPageUseCase: DeletePermissionPageUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionPages',
    page: 'DeletePermissionPage',
  })
  @ApiOperation({ summary: 'Exclusão do modulo da permissão' })
  @ApiOkResponse()
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deletePermissionPageUseCase.execute(id);
  }
}
