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
import { DeletePermissionPageUseCase } from '../../../application/use-cases';

@ApiTags('Permission Pages')
@Controller('permission_pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeletePermissionPageController {
  constructor(
    @Inject(forwardRef(() => DeletePermissionPageUseCase))
    private readonly deletePermissionPageUseCase: DeletePermissionPageUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionPages', page: 'DeletePermissionPage' })
  @ApiOperation({ summary: 'Deleting a permission page' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deletePermissionPageUseCase.execute(id);
  }
}
