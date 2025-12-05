import {
  DeletedAndUpdatedDataResponseDto,
  ErrorBadRequestResponseDto,
  type IUserDecorator,
  User,
} from '@/src/infra';
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
import { DeleteUserUseCase } from '../../../application/use-cases';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteUserController {
  constructor(
    @Inject(forwardRef(() => DeleteUserUseCase))
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Users', page: 'DeleteUser' })
  @ApiOperation({ summary: 'Deleting a user' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @User() { isAdmin, tenantId }: IUserDecorator,
  ) {
    return await this.deleteUserUseCase.execute({ id, isAdmin, tenantId });
  }
}
