import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeleteTenantStatusUseCase } from '../../../application/use-cases';

@ApiTags('Tenant status')
@Controller('tenant-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteTenantStatusController {
  constructor(
    @Inject(forwardRef(() => DeleteTenantStatusUseCase))
    private readonly deleteTenantStatusUseCase: DeleteTenantStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'DeletePermission' })
  @ApiOperation({ summary: 'Deleting a Tenant status' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteTenantStatusUseCase.execute(id);
  }
}
