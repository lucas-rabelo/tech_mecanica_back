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
import { CreateServiceMaterialUseCase } from '../../../application/use-cases';
import {
  CreateServiceMaterialRequestDto,
  ReadServiceMaterialResponseDto,
} from '../../../dtos';

@ApiTags('Service Materials')
@Controller('service_materials')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateServiceMaterialController {
  constructor(
    @Inject(forwardRef(() => CreateServiceMaterialUseCase))
    private readonly createServiceMaterialUseCase: CreateServiceMaterialUseCase,
  ) {}

  @RequireAccess({ module: 'ServiceMaterials', page: 'CreateServiceMaterial' })
  @ApiOperation({ summary: 'Creating a new service material' })
  @ApiOkResponse({ type: ReadServiceMaterialResponseDto })
  @Post()
  async handle(@Body() body: CreateServiceMaterialRequestDto) {
    return await this.createServiceMaterialUseCase.execute(body);
  }
}
