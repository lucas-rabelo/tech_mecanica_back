import {
  ErrorBadRequestResponseDto,
  ListOptionsSelectResponseDto,
  RequireAccess,
} from '@/src/infra';
import { Controller, forwardRef, Get, Inject, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ListOptionsSelectUseCase } from '../../../application/use-cases';
import type { ListOptionsSelectRequestDto } from '../../../dtos';

@ApiTags('Inventory Movements')
@Controller('inventory_movements')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListOptionsInventoryMovementController {
  constructor(
    @Inject(forwardRef(() => ListOptionsSelectUseCase))
    private readonly listOptionsSelectUseCase: ListOptionsSelectUseCase,
  ) {}

  @RequireAccess({
    module: 'InventoryMovements',
    page: 'ListInventoryMovement',
  })
  @ApiOperation({ summary: 'List of options' })
  @ApiOkResponse({ type: ListOptionsSelectResponseDto })
  @Get('by-type/:type')
  async handle(@Param('type') type: string) {
    return this.listOptionsSelectUseCase.execute({ type });
  }
}
