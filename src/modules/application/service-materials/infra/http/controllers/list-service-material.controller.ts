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
import { ListServiceMaterialUseCase } from '../../../application/use-cases';
import {
  FilterListServiceMaterialsRequestDto,
  ListServiceMaterialsResponseDto,
} from '../../../dtos';

@ApiTags('Service Materials')
@Controller('service_materials')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListServiceMaterialController {
  constructor(
    @Inject(forwardRef(() => ListServiceMaterialUseCase))
    private readonly listServiceMaterialUseCase: ListServiceMaterialUseCase,
  ) {}

  @RequireAccess({ module: 'ServiceMaterials', page: 'ListServiceMaterial' })
  @ApiOperation({ summary: 'List of service materials' })
  @ApiOkResponse({ type: ListServiceMaterialsResponseDto })
  @Get()
  async handle(@Query() filters: FilterListServiceMaterialsRequestDto) {
    return await this.listServiceMaterialUseCase.execute(filters);
  }
}
