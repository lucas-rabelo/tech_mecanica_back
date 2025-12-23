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
import { CreateServiceUseCase } from '../../../application/use-cases';
import {
  CreateServiceRequestDto,
  ReadServiceResponseDto,
} from '../../../dtos';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateServiceController {
  constructor(
    @Inject(forwardRef(() => CreateServiceUseCase))
    private readonly createServiceUseCase: CreateServiceUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'CreateService' })
  @ApiOperation({ summary: 'Creating a new service' })
  @ApiOkResponse({ type: ReadServiceResponseDto })
  @Post()
  async handle(@Body() body: CreateServiceRequestDto) {
    return await this.createServiceUseCase.execute(body);
  }
}
