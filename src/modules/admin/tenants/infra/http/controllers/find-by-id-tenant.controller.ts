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
import { ReadTenantsResponseDto } from '../../../dtos';

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
  @ApiOkResponse({ type: ReadTenantsResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdTenantUseCase.execute(id);
  }
}