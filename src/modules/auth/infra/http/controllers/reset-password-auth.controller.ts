import { ErrorBadRequestResponseDto, Public } from '@/src/infra';
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
import { ResetPasswordAuthUseCase } from '../../../application/use-cases';
import {
  ResetPasswordAuthRequestDto,
  SendLinkResetPasswordAuthResponseDto,
} from '../../../dto';
import { User } from '@/src/infra';
import { ReadUserResponseDto } from '@/src/modules/users';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@Public()
export class ResetPasswordAuthController {
  constructor(
    @Inject(forwardRef(() => ResetPasswordAuthUseCase))
    private readonly resetPasswordAuthUseCase: ResetPasswordAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Fluxo de esqueceu a senha' })
  @ApiOkResponse({ type: SendLinkResetPasswordAuthResponseDto })
  @Post('reset-password')
  async handle(
    @User() user: ReadUserResponseDto,
    @Body() body: ResetPasswordAuthRequestDto
  ) {
    return await this.resetPasswordAuthUseCase.execute(user.id, body);
  }
}
