import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import { DeletePageUseCase } from '../../../application/use-cases';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeletePageController {
  constructor(
    @Inject(forwardRef(() => DeletePageUseCase))
    private readonly deletePageUseCase: DeletePageUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'DeletePermission' })
  @ApiOperation({ summary: 'Deleting a page' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deletePageUseCase.execute(id);
  }
}
