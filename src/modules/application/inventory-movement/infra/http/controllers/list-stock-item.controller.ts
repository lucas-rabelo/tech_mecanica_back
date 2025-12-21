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
import { ListInventoryMovementUseCase } from '../../../application/use-cases';
import {
  FilterListInventoryMovementsRequestDto,
  ListInventoryMovementsResponseDto,
} from '../../../dtos';

@ApiTags('Inventory Movements')
@Controller('inventory_movements')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListInventoryMovementController {
  constructor(
    @Inject(forwardRef(() => ListInventoryMovementUseCase))
    private readonly listInventoryMovementUseCase: ListInventoryMovementUseCase,
  ) {}

  @RequireAccess({ module: 'InventoryMovements', page: 'ListInventoryMovement' })
  @ApiOperation({ summary: 'List of customers' })
  @ApiOkResponse({ type: ListInventoryMovementsResponseDto })
  @Get()
  async handle(@Query() filters: FilterListInventoryMovementsRequestDto) {
    return await this.listInventoryMovementUseCase.execute(filters);
  }
}
