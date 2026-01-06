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
import { DeleteUserTenantsUseCase } from '../../../application/use-cases';

@ApiTags('User Tenants')
@Controller('user-tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteUserTenantsController {
  constructor(
    @Inject(forwardRef(() => DeleteUserTenantsUseCase))
    private readonly deleteUserTenantsUseCase: DeleteUserTenantsUseCase,
  ) {}

  @RequireAccess({ module: 'UserTenants', page: 'DeleteUserTenants' })
  @ApiOperation({ summary: 'Deleting a user tenants' })
  @ApiOkResponse()
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteUserTenantsUseCase.execute(id);
  }
}
