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
import {
  FilterListPageRequestDto,
  ListPagesResponseDto,
} from '../../../dtos';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPageController {
  constructor(
    @Inject(forwardRef(() => ListPageUseCase))
    private readonly listPageUseCase: ListPageUseCase,
  ) {}

  @RequireAccess({ module: 'Pages', page: 'ListPage' })
  @ApiOperation({ summary: 'List of pages' })
  @ApiOkResponse({ type: ListPagesResponseDto })
  @Get()
  async handle(@Query() filters: FilterListPageRequestDto) {
    return await this.listPageUseCase.execute(filters);
  }
}
