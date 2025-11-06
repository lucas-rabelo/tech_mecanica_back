import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  Delete,
  forwardRef,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeletePermissionModuleUseCase } from '../../../application/use-cases';

@ApiTags('Permission Modules')
@Controller('permission-modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeletePermissionModulesController {
  constructor(
    @Inject(forwardRef(() => DeletePermissionModuleUseCase))
    private readonly deletePermissionModuleUseCase: DeletePermissionModuleUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionModules',
    page: 'DeletePermissionModule',
  })
  @ApiOperation({ summary: 'Exclusão do modulo da permissão' })
  @ApiOkResponse()
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deletePermissionModuleUseCase.execute(id);
  }
}
