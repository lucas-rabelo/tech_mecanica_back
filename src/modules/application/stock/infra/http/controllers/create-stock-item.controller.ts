import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateStockItemUseCase } from '../../../application/use-cases';
import {
  CreateStockItemRequestDto,
  ReadStockItemResponseDto,
} from '../../../dtos';

@ApiTags('Stock Items')
@Controller('stock_items')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateStockItemController {
  constructor(
    @Inject(forwardRef(() => CreateStockItemUseCase))
    private readonly createStockItemUseCase: CreateStockItemUseCase,
  ) {}

  @RequireAccess({ module: 'StockItems', page: 'CreateStockItem' })
  @ApiOperation({ summary: 'Creating a new stock item' })
  @ApiOkResponse({ type: ReadStockItemResponseDto })
  @Post()
  async handle(@Body() body: CreateStockItemRequestDto) {
    return await this.createStockItemUseCase.execute(body);
  }
}
