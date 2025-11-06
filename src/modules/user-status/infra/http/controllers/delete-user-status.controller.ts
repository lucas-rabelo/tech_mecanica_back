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
import { DeleteUserStatusUseCase } from '../../../application/use-cases';

@ApiTags('User Status')
@Controller('user-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteUserStatusController {
  constructor(
    @Inject(forwardRef(() => DeleteUserStatusUseCase))
    private readonly deleteUserStatusUseCase: DeleteUserStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'DeleteTenantStatus' })
  @ApiOperation({ summary: 'Exclusão do status para usuários' })
  @ApiOkResponse()
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserStatusUseCase.execute(id);
  }
}
