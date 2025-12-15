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
import { CreateVehicleUseCase } from '../../../application/use-cases';
import {
  CreateVehicleRequestDto,
  ReadVehicleResponseDto,
} from '../../../dtos';

@ApiTags('Vehicles')
@Controller('vehicles')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateVehicleController {
  constructor(
    @Inject(forwardRef(() => CreateVehicleUseCase))
    private readonly createVehicleUseCase: CreateVehicleUseCase,
  ) {}

  @RequireAccess({ module: 'Vehicles', page: 'CreateVehicle' })
  @ApiOperation({ summary: 'Creating a new customer' })
  @ApiOkResponse({ type: ReadVehicleResponseDto })
  @Post()
  async handle(@Body() body: CreateVehicleRequestDto) {
    return await this.createVehicleUseCase.execute(body);
  }
}
