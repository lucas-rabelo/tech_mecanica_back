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
  FilterListTenantStatusRequestDto,
  ListTenantStatusResponseDto,
} from '../../../dtos';

@ApiTags('Tenant status')
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
  @ApiOperation({ summary: 'List of Tenant status' })
  @ApiOkResponse({ type: ListTenantStatusResponseDto })
  @Get()
  async handle(@Query() filters: FilterListTenantStatusRequestDto) {
    return await this.listTenantStatusUseCase.execute(filters);
  }
}
