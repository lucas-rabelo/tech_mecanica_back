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
import { ListTenantStatusUseCase } from '../../../application/use-cases';
import {
  CreateTenantStatusResponseDto,
  ListTenantStatusRequestDto,
} from '../../../dto';

@ApiTags('Tenant Status')
@Controller('tenant-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListTenantStatusController {
  constructor(
    @Inject(forwardRef(() => ListTenantStatusUseCase))
    private readonly listTenantStatusUseCase: ListTenantStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'ListTenantStatus' })
  @ApiOperation({ summary: 'Listagem dos status para clientes' })
  @ApiOkResponse({ type: [CreateTenantStatusResponseDto] })
  @Get()
  async handle(@Query() filters: ListTenantStatusRequestDto) {
    return await this.listTenantStatusUseCase.execute(filters);
  }
}
