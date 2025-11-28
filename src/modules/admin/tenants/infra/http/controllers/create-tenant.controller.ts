import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateTenantUseCase } from '../../../application/use-cases';
import {
  CreateTenantsRequestDto,
  ReadTenantsResponseDto,
} from '../../../dtos';

@ApiTags('Tenants')
@Controller('tenants')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateTenantController {
  constructor(
    @Inject(forwardRef(() => CreateTenantUseCase))
    private readonly createTenantUseCase: CreateTenantUseCase,
  ) {}

  // @RequireAccess({ module: 'Tenants', page: 'CreateTenant' })
  @ApiOperation({ summary: 'Creating a new tenant' })
  @ApiOkResponse({ type: ReadTenantsResponseDto })
  @Post()
  async handle(@Body() body: CreateTenantsRequestDto) {
    return await this.createTenantUseCase.execute(body);
  }
}