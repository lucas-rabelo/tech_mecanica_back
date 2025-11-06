import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
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
import { CreateTenantResponseDto } from '../../../dto';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteTenantsController {
  constructor(
    @Inject(forwardRef(() => DeleteTenantUseCase))
    private readonly deleteTenantUseCase: DeleteTenantUseCase,
  ) {}

  @RequireAccess({ module: 'Tenants', page: 'DeleteTenant' })
  @ApiOperation({ summary: 'Exclusão do cliente' })
  @ApiOkResponse({ type: CreateTenantResponseDto })
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteTenantUseCase.execute(id);
  }
}
