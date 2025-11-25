import { ErrorBadRequestResponseDto /*RequireAccess*/ } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
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
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateUserController {
  constructor(
    @Inject(forwardRef(() => CreateUserUseCase))
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Users', page: 'CreateUser' })
  @ApiOperation({ summary: 'Creating a new user' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Post()
  async handle(@Body() body: CreateUserRequestDto) {
    return await this.createUserUseCase.execute(body);
  }
}
