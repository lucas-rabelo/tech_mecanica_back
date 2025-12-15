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
import { DeleteVehicleUseCase } from '../../../application/use-cases';

@ApiTags('Vehicles')
@Controller('vehicles')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteVehicleController {
  constructor(
    @Inject(forwardRef(() => DeleteVehicleUseCase))
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
  ) {}

  @RequireAccess({ module: 'Vehicles', page: 'DeleteVehicle' })
  @ApiOperation({ summary: 'Deleting a customer' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteVehicleUseCase.execute(id);
  }
}
