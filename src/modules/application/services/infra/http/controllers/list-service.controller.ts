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
import { ListServiceUseCase } from '../../../application/use-cases';
import {
  FilterListServicesRequestDto,
  ListServicesResponseDto,
} from '../../../dtos';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListServiceController {
  constructor(
    @Inject(forwardRef(() => ListServiceUseCase))
    private readonly listServiceUseCase: ListServiceUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'ListService' })
  @ApiOperation({ summary: 'List of services' })
  @ApiOkResponse({ type: ListServicesResponseDto })
  @Get()
  async handle(@Query() filters: FilterListServicesRequestDto) {
    return await this.listServiceUseCase.execute(filters);
  }
}
