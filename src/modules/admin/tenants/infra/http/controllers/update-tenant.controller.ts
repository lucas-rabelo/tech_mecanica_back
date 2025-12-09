import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateTenantUseCase } from '../../../application/use-cases';
import {
  CreateTenantsRequestDto,
  ReadTenantsResponseDto,
} from '../../../dtos';
import { MODULES, PAGES } from '@/src/core';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateTenantController {
  constructor(
    @Inject(forwardRef(() => UpdateTenantUseCase))
    private readonly updateTenantUseCase: UpdateTenantUseCase,
  ) {}

  @RequireAccess({ module: MODULES.TENANTS, page: PAGES.UPDATE_TENANTS })
  @ApiOperation({ summary: 'Updating a tenant' })
  @ApiOkResponse({ type: ReadTenantsResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTenantsRequestDto,
  ) {
    return await this.updateTenantUseCase.execute(id, body);
  }
}