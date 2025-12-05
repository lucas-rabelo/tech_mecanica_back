import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import { CreateUserStatusUseCase } from '../../../application/use-cases';
import {
  CreateUserStatusRequestDto,
  ReadUserStatusResponseDto,
} from '../../../dtos';

@ApiTags('User status')
@Controller('user-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateUserStatusController {
  constructor(
    @Inject(forwardRef(() => CreateUserStatusUseCase))
    private readonly createUserStatusUseCase: CreateUserStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'CreatePermission' })
  @ApiOperation({ summary: 'Creating a new user status' })
  @ApiOkResponse({ type: ReadUserStatusResponseDto })
  @Post()
  async handle(@Body() body: CreateUserStatusRequestDto) {
    return await this.createUserStatusUseCase.execute(body);
  }
}