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
import { CreateServicesUseCase } from '../../../application/use-cases';
import {
  CreateServiceRequestDto,
  ReadServiceResponseDto,
} from '../../../dto';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateServiceController {
  constructor(
    @Inject(forwardRef(() => CreateServicesUseCase))
    private readonly createServicesUseCase: CreateServicesUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'CreateService' })
  @ApiOperation({ summary: 'Criação de novo serviço' })
  @ApiOkResponse({ type: ReadServiceResponseDto })
  @Post()
  async handle(@Body() body: CreateServiceRequestDto) {
    return await this.createServicesUseCase.execute(body);
  }
}
