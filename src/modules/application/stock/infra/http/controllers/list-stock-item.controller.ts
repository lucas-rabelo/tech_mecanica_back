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
import { ListStockItemUseCase } from '../../../application/use-cases';
import {
  FilterListStockItemsRequestDto,
  ListStockItemsResponseDto,
} from '../../../dtos';

@ApiTags('Stock Items')
@Controller('stock_items')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListStockItemController {
  constructor(
    @Inject(forwardRef(() => ListStockItemUseCase))
    private readonly listStockItemUseCase: ListStockItemUseCase,
  ) {}

  @RequireAccess({ module: 'StockItems', page: 'ListStockItem' })
  @ApiOperation({ summary: 'List of customers' })
  @ApiOkResponse({ type: ListStockItemsResponseDto })
  @Get()
  async handle(@Query() filters: FilterListStockItemsRequestDto) {
    return await this.listStockItemUseCase.execute(filters);
  }
}
