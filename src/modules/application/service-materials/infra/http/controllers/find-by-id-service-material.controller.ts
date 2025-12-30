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
import { FindByIdServiceMaterialUseCase } from '../../../application/use-cases';
import { ReadServiceMaterialResponseDto } from '../../../dtos';

@ApiTags('Service Materials')
@Controller('service_materials')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdServiceMaterialController {
  constructor(
    @Inject(forwardRef(() => FindByIdServiceMaterialUseCase))
    private readonly findByIdServiceMaterialUseCase: FindByIdServiceMaterialUseCase,
  ) {}

  @RequireAccess({ module: 'ServiceMaterials', page: 'FindServiceMaterial' })
  @ApiOperation({ summary: 'Finding a service material by ID' })
  @ApiOkResponse({ type: ReadServiceMaterialResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdServiceMaterialUseCase.execute(id);
  }
}
