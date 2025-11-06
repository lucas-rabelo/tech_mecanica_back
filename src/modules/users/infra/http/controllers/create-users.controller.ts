import {
  ErrorBadRequestResponseDto,
  RequireAccess,
  TenantId,
} from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserUseCase } from '../../../application/use-cases';
import { CreateUserRequestDto, ReadUserResponseDto } from '../../../dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateUsersController {
  constructor(
    @Inject(forwardRef(() => CreateUserUseCase))
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @RequireAccess({ module: 'Users', page: 'CreateUser' })
  @ApiOperation({ summary: 'Criação de um novo usuário' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Post()
  async handle(
    @Body() body: CreateUserRequestDto,
    @TenantId() tenantId: number,
  ) {
    return await this.createUserUseCase.execute({ ...body, tenantId });
  }
}
