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
import { UpdateUserUseCase } from '../../../application/use-cases';
import { CreateUserRequestDto, ReadUserResponseDto } from '../../../dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateUsersController {
  constructor(
    @Inject(forwardRef(() => UpdateUserUseCase))
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @RequireAccess({ module: 'Users', page: 'UpdateUser' })
  @ApiOperation({ summary: 'Atualização do usuário' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserRequestDto,
  ) {
    return await this.updateUserUseCase.execute(id, body);
  }
}
