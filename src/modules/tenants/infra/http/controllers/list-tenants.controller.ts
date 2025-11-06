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
import { ListTenantUseCase } from '../../../application/use-cases';
import { CreateTenantResponseDto, ListTenantRequestDto } from '../../../dto';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListTenantsController {
  constructor(
    @Inject(forwardRef(() => ListTenantUseCase))
    private readonly listTenantUseCase: ListTenantUseCase,
  ) {}

  @RequireAccess({ module: 'Tenants', page: 'ListTenant' })
  @ApiOperation({ summary: 'Listagem dos clientes' })
  @ApiOkResponse({ type: [CreateTenantResponseDto] })
  @Get()
  async handle(@Query() filters: ListTenantRequestDto) {
    return await this.listTenantUseCase.execute(filters);
  }
}
