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
import { CreateTenantStatusUseCase } from '../../../application/use-cases';
import {
  CreateTenantStatusRequestDto,
  ReadTenantStatusResponseDto,
} from '../../../dtos';

@ApiTags('Tenant status')
@Controller('tenant-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateTenantStatusController {
  constructor(
    @Inject(forwardRef(() => CreateTenantStatusUseCase))
    private readonly createTenantStatusUseCase: CreateTenantStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'CreatePermission' })
  @ApiOperation({ summary: 'Creating a new Tenant status' })
  @ApiOkResponse({ type: ReadTenantStatusResponseDto })
  @Post()
  async handle(@Body() body: CreateTenantStatusRequestDto) {
    return await this.createTenantStatusUseCase.execute(body);
  }
}