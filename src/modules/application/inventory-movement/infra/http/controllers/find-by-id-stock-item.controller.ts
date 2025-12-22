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
import { FindByIdInventoryMovementUseCase } from '../../../application/use-cases';
import { ReadInventoryMovementResponseDto } from '../../../dtos';

@ApiTags('Inventory Movements')
@Controller('inventory_movements')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdInventoryMovementController {
  constructor(
    @Inject(forwardRef(() => FindByIdInventoryMovementUseCase))
    private readonly findByIdInventoryMovementUseCase: FindByIdInventoryMovementUseCase,
  ) {}

  @RequireAccess({ module: 'InventoryMovements', page: 'FindInventoryMovement' })
  @ApiOperation({ summary: 'Finding a customer by ID' })
  @ApiOkResponse({ type: ReadInventoryMovementResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdInventoryMovementUseCase.execute(id);
  }
}
