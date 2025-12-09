import {
  AuthGuard,
  ErrorBadRequestResponseDto,
  RequireAccess,
  type IUserDecorator,
} from '@/src/infra';
import { User } from '@/src/infra/decorators';
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
import { MODULES, PAGES } from '@/src/core';

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

  @RequireAccess({ module: MODULES.USERS, page: PAGES.CREATE_USERS })
  @ApiOperation({ summary: 'Creating a new user' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Post()
  async handle(
    @User() { isAdmin, tenantId }: IUserDecorator,
    @Body()
    request: CreateUserRequestDto,
  ) {
    return await this.createUserUseCase.execute({ isAdmin, tenantId, request });
  }
}
