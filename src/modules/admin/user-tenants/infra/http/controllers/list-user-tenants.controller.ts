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
import { ListUserTenantsUseCase } from '../../../application/use-cases';
import {
  FilterListUserTenantRequestDto,
  ListUserTenantsResponseDto,
} from '../../../dtos';

@ApiTags('User Tenants')
@Controller('user-tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListUserTenantsController {
  constructor(
    @Inject(forwardRef(() => ListUserTenantsUseCase))
    private readonly listUserTenantsUseCase: ListUserTenantsUseCase,
  ) {}

  @RequireAccess({ module: 'UserTenants', page: 'ListUserTenants' })
  @ApiOperation({ summary: 'List of user tenants' })
  @ApiOkResponse({ type: ListUserTenantsResponseDto })
  @Get()
  async handle(@Query() filters: FilterListUserTenantRequestDto) {
    return await this.listUserTenantsUseCase.execute(filters);
  }
}
