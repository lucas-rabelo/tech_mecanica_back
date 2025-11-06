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
import { DeleteUserUseCase } from '../../../application/use-cases';
import { ReadUserResponseDto } from '../../../dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteUsersController {
  constructor(
    @Inject(forwardRef(() => DeleteUserUseCase))
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @RequireAccess({ module: 'Users', page: 'DeleteUser' })
  @ApiOperation({ summary: 'Exclusão do usuário' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUserUseCase.execute(id);
  }
}
