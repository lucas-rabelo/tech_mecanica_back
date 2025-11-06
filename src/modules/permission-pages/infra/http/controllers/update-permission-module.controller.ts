import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Param,
  ParseIntPipe,
  Put,
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
import { UpdatePermissionPageUseCase } from '../../../application/use-cases';
import {
  CreatePermissionPagesRequestDto,
  ReadPermissionPagesResponseDto,
} from '../../../dto';

@ApiTags('Permission Pages')
@Controller('permission-pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdatePermissionPagesController {
  constructor(
    @Inject(forwardRef(() => UpdatePermissionPageUseCase))
    private readonly updatePermissionPageUseCase: UpdatePermissionPageUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionPages',
    page: 'UpdatePermissionPage',
  })
  @ApiOperation({ summary: 'Atualização da página na permissão' })
  @ApiOkResponse({ type: ReadPermissionPagesResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionPagesRequestDto,
  ) {
    return await this.updatePermissionPageUseCase.execute(id, body);
  }
}
