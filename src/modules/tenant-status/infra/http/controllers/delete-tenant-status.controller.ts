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
import { DeleteTenantStatusUseCase } from '../../../application/use-cases';
import { CreateTenantStatusResponseDto } from '../../../dto';

@ApiTags('Tenant Status')
@Controller('tenant-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteTenantStatusController {
  constructor(
    @Inject(forwardRef(() => DeleteTenantStatusUseCase))
    private readonly deleteTenantStatusUseCase: DeleteTenantStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'DeleteTenantStatus' })
  @ApiOperation({ summary: 'Exclusão do status para clientes' })
  @ApiOkResponse({ type: CreateTenantStatusResponseDto })
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteTenantStatusUseCase.execute(id);
  }
}
