import {
  DeletedAndUpdatedDataResponseDto,
  ErrorBadRequestResponseDto,
  RequireAccess,
} from '@/src/infra';
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
import { UpdateStockItemUseCase } from '../../../application/use-cases';
import { UpdateStockItemRequestDto } from '../../../dtos';

@ApiTags('Stock Items')
@Controller('stock_items')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateStockItemController {
  constructor(
    @Inject(forwardRef(() => UpdateStockItemUseCase))
    private readonly updateStockItemUseCase: UpdateStockItemUseCase,
  ) {}

  @RequireAccess({ module: 'StockItems', page: 'UpdateStockItem' })
  @ApiOperation({ summary: 'Updating a stock item' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStockItemRequestDto,
  ) {
    return await this.updateStockItemUseCase.execute(id, body);
  }
}
