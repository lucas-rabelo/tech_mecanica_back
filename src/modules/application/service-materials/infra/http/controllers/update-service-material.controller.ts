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
import { UpdateServiceMaterialUseCase } from '../../../application/use-cases';
import { UpdateServiceMaterialRequestDto } from '../../../dtos';

@ApiTags('Service Materials')
@Controller('service_materials')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateServiceMaterialController {
  constructor(
    @Inject(forwardRef(() => UpdateServiceMaterialUseCase))
    private readonly updateServiceMaterialUseCase: UpdateServiceMaterialUseCase,
  ) {}

  @RequireAccess({ module: 'ServiceMaterials', page: 'UpdateServiceMaterial' })
  @ApiOperation({ summary: 'Updating a service material' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceMaterialRequestDto,
  ) {
    return await this.updateServiceMaterialUseCase.execute(id, body);
  }
}
