import { ErrorBadRequestResponseDto, Public } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ForgotPasswordAuthUseCase } from '../../../application/use-cases';
import {
  ForgotPasswordAuthRequestDto,
  SendLinkResetPasswordAuthResponseDto,
} from '../../../dtos';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@Public()
export class ForgotPasswordAuthController {
  constructor(
    @Inject(forwardRef(() => ForgotPasswordAuthUseCase))
    private readonly forgotPasswordAuthUseCase: ForgotPasswordAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Fluxo de esqueceu a senha' })
  @ApiOkResponse({ type: SendLinkResetPasswordAuthResponseDto })
  @Post('forget-password')
  async handle(
    @Body() body: ForgotPasswordAuthRequestDto,
  ) {
    return await this.forgotPasswordAuthUseCase.execute(body);
  }
}