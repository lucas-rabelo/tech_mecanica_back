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
import { FindByIdVehicleUseCase } from '../../../application/use-cases';
import { ReadVehicleResponseDto } from '../../../dtos';

@ApiTags('Vehicles')
@Controller('vehicles')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdVehicleController {
  constructor(
    @Inject(forwardRef(() => FindByIdVehicleUseCase))
    private readonly findByIdVehicleUseCase: FindByIdVehicleUseCase,
  ) {}

  @RequireAccess({ module: 'Vehicles', page: 'FindVehicle' })
  @ApiOperation({ summary: 'Finding a customer by ID' })
  @ApiOkResponse({ type: ReadVehicleResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdVehicleUseCase.execute(id);
  }
}
