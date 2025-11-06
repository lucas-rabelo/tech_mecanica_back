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
import { ListServicesUseCase } from '../../../application/use-cases';
import { ListServicesRequestDto, ReadServiceResponseDto } from '../../../dto';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListServicesController {
  constructor(
    @Inject(forwardRef(() => ListServicesUseCase))
    private readonly listServicesUseCase: ListServicesUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'ListService' })
  @ApiOperation({ summary: 'Listagem dos serviços' })
  @ApiOkResponse({ type: [ReadServiceResponseDto] })
  @Get()
  async handle(@Query() filters: ListServicesRequestDto) {
    return await this.listServicesUseCase.execute(filters);
  }
}
