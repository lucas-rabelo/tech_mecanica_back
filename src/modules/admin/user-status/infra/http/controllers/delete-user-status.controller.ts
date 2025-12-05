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
import { DeleteUserStatusUseCase } from '../../../application/use-cases';

@ApiTags('User status')
@Controller('user-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteUserStatusController {
  constructor(
    @Inject(forwardRef(() => DeleteUserStatusUseCase))
    private readonly deleteUserStatusUseCase: DeleteUserStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'DeletePermission' })
  @ApiOperation({ summary: 'Deleting a user status' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteUserStatusUseCase.execute(id);
  }
}
