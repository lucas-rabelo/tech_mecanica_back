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
import { DeletePermissionsUseCase } from '../../../application/use-cases';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeletePermissionController {
  constructor(
    @Inject(forwardRef(() => DeletePermissionsUseCase))
    private readonly deletePermissionsUseCase: DeletePermissionsUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'DeletePermission' })
  @ApiOperation({ summary: 'Exclusão de uma permissão' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deletePermissionsUseCase.execute(id);
  }
}
