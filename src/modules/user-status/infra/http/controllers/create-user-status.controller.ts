import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
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
import { CreateUserStatusUseCase } from '../../../application/use-cases';
import {
  CreateUserStatusRequestDto,
  CreateUserStatusResponseDto,
} from '../../../dto';

@ApiTags('User Status')
@Controller('user-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateUserStatusController {
  constructor(
    @Inject(forwardRef(() => CreateUserStatusUseCase))
    private readonly createUserStatusUseCase: CreateUserStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'CreateTenantStatus' })
  @ApiOperation({ summary: 'Criação de novo status para usuários' })
  @ApiOkResponse({ type: CreateUserStatusResponseDto })
  @Post()
  async handle(@Body() body: CreateUserStatusRequestDto) {
    return await this.createUserStatusUseCase.execute(body.name);
  }
}
