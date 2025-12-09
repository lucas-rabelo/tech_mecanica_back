import { DeletedAndUpdatedDataResponseDto, ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  Delete,
  forwardRef,
  Inject,
  Param,
  ParseIntPipe,
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
import { DeleteTenantUseCase } from '../../../application/use-cases';
import { MODULES, PAGES } from '@/src/core';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteTenantController {
  constructor(
    @Inject(forwardRef(() => DeleteTenantUseCase))
    private readonly deleteTenantUseCase: DeleteTenantUseCase,
  ) {}

  @RequireAccess({ module: MODULES.TENANTS, page: PAGES.DELETE_TENANTS })
  @ApiOperation({ summary: 'Deleting a tenant' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteTenantUseCase.execute(id);
  }
}
