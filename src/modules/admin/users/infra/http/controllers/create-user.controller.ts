import {
  AuthGuard,
  ErrorBadRequestResponseDto /*RequireAccess*/,
  TenantId,
} from '@/src/infra';
import { IsAdmin } from '@/src/infra/decorators';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Post,
  UseGuards,
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
import { CreateUserUseCase } from '../../../application/use-cases';
import { CreateUserRequestDto, ReadUserResponseDto } from '../../../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@UseGuards(AuthGuard)
export class CreateUserController {
  constructor(
    @Inject(forwardRef(() => CreateUserUseCase))
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Users', page: 'CreateUser' })
  @ApiOperation({ summary: 'Creating a new user' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Post()
  async handle(
    @IsAdmin() isAdmin: boolean,
    @TenantId() tenantId: number,
    @Body() request: CreateUserRequestDto,
  ) {
    return await this.createUserUseCase.execute({ isAdmin, tenantId, request });
  }
}
