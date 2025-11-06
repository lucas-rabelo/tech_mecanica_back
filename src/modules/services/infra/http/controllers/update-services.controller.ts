import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
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
import { UpdateServicesUseCase } from '../../../application/use-cases';
import { CreateServiceRequestDto, ReadServiceResponseDto } from '../../../dto';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateServicesController {
  constructor(
    @Inject(forwardRef(() => UpdateServicesUseCase))
    private readonly updateServicesUseCase: UpdateServicesUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'UpdateService' })
  @ApiOperation({ summary: 'Atualização do serviço' })
  @ApiOkResponse({ type: ReadServiceResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateServiceRequestDto,
  ) {
    return await this.updateServicesUseCase.execute(id, body);
  }
}
