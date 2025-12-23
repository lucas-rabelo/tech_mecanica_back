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
import { CreateInventoryMovementUseCase } from '../../../application/use-cases';
import {
  CreateInventoryMovementRequestDto,
  ReadInventoryMovementResponseDto,
} from '../../../dtos';

@ApiTags('Inventory Movements')
@Controller('inventory_movements')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateInventoryMovementController {
  constructor(
    @Inject(forwardRef(() => CreateInventoryMovementUseCase))
    private readonly createInventoryMovementUseCase: CreateInventoryMovementUseCase,
  ) {}

  @RequireAccess({
    module: 'InventoryMovements',
    page: 'CreateInventoryMovement',
  })
  @ApiOperation({ summary: 'Creating a new inventory movement' })
  @ApiOkResponse({ type: ReadInventoryMovementResponseDto })
  @Post()
  async handle(@Body() body: CreateInventoryMovementRequestDto) {
    return await this.createInventoryMovementUseCase.execute(body);
  }
}
