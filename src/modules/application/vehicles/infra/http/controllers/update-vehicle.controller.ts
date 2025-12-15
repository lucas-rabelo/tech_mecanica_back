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
import { UpdateVehicleUseCase } from '../../../application/use-cases';
import { UpdateVehicleRequestDto } from '../../../dtos';

@ApiTags('Vehicles')
@Controller('vehicles')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateVehicleController {
  constructor(
    @Inject(forwardRef(() => UpdateVehicleUseCase))
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
  ) {}

  @RequireAccess({ module: 'Vehicles', page: 'UpdateVehicle' })
  @ApiOperation({ summary: 'Updating a customer' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateVehicleRequestDto,
  ) {
    return await this.updateVehicleUseCase.execute(id, body);
  }
}
