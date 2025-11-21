import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
import { Controller, forwardRef, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
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

@ApiTags('Tenants')
@Controller('tenants')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListTenantController {
  constructor(
    @Inject(forwardRef(() => ListTenantUseCase))
    private readonly listTenantUseCase: ListTenantUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of permissions' })
  @ApiOkResponse({ type: ListTenantsResponseDto })
  @Get()
  async handle(@Query() filters: FiltersListTenantsRequestDto) {
    return await this.listTenantUseCase.execute(filters);
  }
}
