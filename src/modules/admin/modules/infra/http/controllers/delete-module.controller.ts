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
import { DeleteModuleUseCase } from '../../../application/use-cases';

@ApiTags('Modules')
@Controller('modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteModuleController {
  constructor(
    @Inject(forwardRef(() => DeleteModuleUseCase))
    private readonly deleteModuleUseCase: DeleteModuleUseCase,
  ) {}

  @RequireAccess({ module: 'Modules', page: 'DeleteModule' })
  @ApiOperation({ summary: 'Deleting a module' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteModuleUseCase.execute(id);
  }
}
