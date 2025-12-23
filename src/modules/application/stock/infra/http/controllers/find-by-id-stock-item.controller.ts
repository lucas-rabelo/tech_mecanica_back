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
import { FindByIdStockItemUseCase } from '../../../application/use-cases';
import { ReadStockItemResponseDto } from '../../../dtos';

@ApiTags('Stock Items')
@Controller('stock_items')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdStockItemController {
  constructor(
    @Inject(forwardRef(() => FindByIdStockItemUseCase))
    private readonly findByIdStockItemUseCase: FindByIdStockItemUseCase,
  ) {}

  @RequireAccess({ module: 'StockItems', page: 'FindStockItem' })
  @ApiOperation({ summary: 'Finding a stock item by ID' })
  @ApiOkResponse({ type: ReadStockItemResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdStockItemUseCase.execute(id);
  }
}
