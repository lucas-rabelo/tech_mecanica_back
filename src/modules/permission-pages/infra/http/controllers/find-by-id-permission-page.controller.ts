import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
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
import { FindByIdPermissionPagesUseCase } from '../../../application/use-cases';
import { ReadPermissionPagesResponseDto } from '../../../dto';

@ApiTags('Permission Pages')
@Controller('permission-pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPermissionPagesController {
  constructor(
    @Inject(forwardRef(() => FindByIdPermissionPagesUseCase))
    private readonly findByIdPermissionPagesUseCase: FindByIdPermissionPagesUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionPages',
    page: 'FindPermissionPage',
  })
  @ApiOperation({ summary: 'Busca da modulo na permissão pelo id' })
  @ApiOkResponse({ type: ReadPermissionPagesResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPermissionPagesUseCase.execute(id);
  }
}
