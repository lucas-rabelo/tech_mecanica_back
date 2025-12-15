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
import { ListVehicleUseCase } from '../../../application/use-cases';
import {
  FilterListVehiclesRequestDto,
  ListVehiclesResponseDto,
} from '../../../dtos';

@ApiTags('Vehicles')
@Controller('vehicles')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListVehicleController {
  constructor(
    @Inject(forwardRef(() => ListVehicleUseCase))
    private readonly listVehicleUseCase: ListVehicleUseCase,
  ) {}

  @RequireAccess({ module: 'Vehicles', page: 'ListVehicle' })
  @ApiOperation({ summary: 'List of customers' })
  @ApiOkResponse({ type: ListVehiclesResponseDto })
  @Get()
  async handle(@Query() filters: FilterListVehiclesRequestDto) {
    return await this.listVehicleUseCase.execute(filters);
  }
}
