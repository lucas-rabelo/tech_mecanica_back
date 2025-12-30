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
import { DeleteServiceMaterialUseCase } from '../../../application/use-cases';

@ApiTags('Service Materials')
@Controller('service_materials')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteServiceMaterialController {
  constructor(
    @Inject(forwardRef(() => DeleteServiceMaterialUseCase))
    private readonly deleteServiceMaterialUseCase: DeleteServiceMaterialUseCase,
  ) {}

  @RequireAccess({ module: 'ServiceMaterials', page: 'DeleteServiceMaterial' })
  @ApiOperation({ summary: 'Deleting a service material' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteServiceMaterialUseCase.execute(id);
  }
}
