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
import { CreateUserTenantsUseCase } from '../../../application/use-cases';
import {
  CreateUserTenantRequestDto,
  ReadUserTenantResponseDto,
} from '../../../dtos';

@ApiTags('User Tenants')
@Controller('user-tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateUserTenantsController {
  constructor(
    @Inject(forwardRef(() => CreateUserTenantsUseCase))
    private readonly createUserTenantsUseCase: CreateUserTenantsUseCase,
  ) {}

  @RequireAccess({ module: 'UserTenants', page: 'CreateUserTenants' })
  @ApiOperation({ summary: 'Creating a new user tenants' })
  @ApiOkResponse({ type: ReadUserTenantResponseDto })
  @Post()
  async handle(@Body() body: CreateUserTenantRequestDto) {
    return await this.createUserTenantsUseCase.execute(body);
  }
}