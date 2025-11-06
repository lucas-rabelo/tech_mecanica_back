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
import { ListPageUseCase } from '../../../application/use-cases';
import { ListPageRequestDto, ReadPageResponseDto } from '../../../dto';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPagesController {
  constructor(
    @Inject(forwardRef(() => ListPageUseCase))
    private readonly listPageUseCase: ListPageUseCase,
  ) {}

  @RequireAccess({ module: 'Pages', page: 'ListPage' })
  @ApiOperation({ summary: 'Listagem das páginas' })
  @ApiOkResponse({ type: [ReadPageResponseDto] })
  @Get()
  async handle(@Query() filters: ListPageRequestDto) {
    return await this.listPageUseCase.execute(filters);
  }
}
