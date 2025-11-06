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
import { CreateTenantUseCase } from '../../../application/use-cases';
import { CreateTenantRequestDto, CreateTenantResponseDto } from '../../../dto';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateTenantsController {
  constructor(
    @Inject(forwardRef(() => CreateTenantUseCase))
    private readonly createTenantUseCase: CreateTenantUseCase,
  ) {}

  @RequireAccess({ module: 'Tenants', page: 'CreateTenant' })
  @ApiOperation({ summary: 'Criação de um novo cliente|' })
  @ApiOkResponse({ type: CreateTenantResponseDto })
  @Post()
  async handle(@Body() body: CreateTenantRequestDto) {
    return await this.createTenantUseCase.execute(body);
  }
}
