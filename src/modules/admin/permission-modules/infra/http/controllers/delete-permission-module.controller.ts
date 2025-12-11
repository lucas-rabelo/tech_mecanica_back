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
@Controller('permission_modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeletePermissionModuleController {
  constructor(
    @Inject(forwardRef(() => DeletePermissionModuleUseCase))
    private readonly deletePermissionModuleUseCase: DeletePermissionModuleUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionModules', page: 'DeletePermissionModule' })
  @ApiOperation({ summary: 'Deleting a permission module' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deletePermissionModuleUseCase.execute(id);
  }
}
