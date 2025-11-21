import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindByIdTenantUseCase } from '../../../application/use-cases';

@ApiTags('Tenants')
@Controller('tenants')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdTenantController {
  constructor(
    @Inject(forwardRef(() => FindByIdTenantUseCase))
    private readonly findByIdTenantUseCase: FindByIdTenantUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'FindPermission' })
  @ApiOperation({ summary: 'Finding a tenant by ID' })
  @ApiOkResponse()
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdTenantUseCase.execute(id);
  }
}