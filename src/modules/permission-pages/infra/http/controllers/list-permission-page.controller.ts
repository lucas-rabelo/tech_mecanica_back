import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Controller, forwardRef, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ListPermissionPageUseCase } from '../../../application/use-cases';
import {
  ListPermissionPagesRequestDto,
  ReadPermissionPagesResponseDto,
} from '../../../dto';

@ApiTags('Permission Pages')
@Controller('permission-pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPermissionPagesController {
  constructor(
    @Inject(forwardRef(() => ListPermissionPageUseCase))
    private readonly listPermissionPageUseCase: ListPermissionPageUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionPages',
    page: 'ListPermissionPage',
  })
  @ApiOperation({ summary: 'Listagem das páginas na permissão' })
  @ApiOkResponse({ type: [ReadPermissionPagesResponseDto] })
  @Get()
  async handle(@Query() filters: ListPermissionPagesRequestDto) {
    return await this.listPermissionPageUseCase.execute(filters);
  }
}
