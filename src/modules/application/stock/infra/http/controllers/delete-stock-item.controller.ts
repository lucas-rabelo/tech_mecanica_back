import {
  DeletedAndUpdatedDataResponseDto,
  ErrorBadRequestResponseDto,
  RequireAccess,
} from '@/src/infra';
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
import { DeleteStockItemUseCase } from '../../../application/use-cases';

@ApiTags('Stock Items')
@Controller('stock_items')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteStockItemController {
  constructor(
    @Inject(forwardRef(() => DeleteStockItemUseCase))
    private readonly deleteStockItemUseCase: DeleteStockItemUseCase,
  ) {}

  @RequireAccess({ module: 'StockItems', page: 'DeleteStockItem' })
  @ApiOperation({ summary: 'Deleting a customer' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteStockItemUseCase.execute(id);
  }
}
