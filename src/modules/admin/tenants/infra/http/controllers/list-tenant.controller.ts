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
import {
  FiltersListTenantsRequestDto,
  ListTenantsResponseDto,
} from '../../../dtos';
import { MODULES, PAGES } from '@/src/core';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListTenantController {
  constructor(
    @Inject(forwardRef(() => ListTenantUseCase))
    private readonly listTenantUseCase: ListTenantUseCase,
  ) {}

  @RequireAccess({ module: MODULES.TENANTS, page: PAGES.LIST_TENANTS })
  @ApiOperation({ summary: 'List of permissions' })
  @ApiOkResponse({ type: ListTenantsResponseDto })
  @Get()
  async handle(@Query() filters: FiltersListTenantsRequestDto) {
    return await this.listTenantUseCase.execute(filters);
  }
}
