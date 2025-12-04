import { ErrorBadRequestResponseDto } from '@/src/infra';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
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
} from '../../../dtos';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ResetPasswordAuthController {
  constructor(
    @Inject(forwardRef(() => ResetPasswordAuthUseCase))
    private readonly resetPasswordAuthUseCase: ResetPasswordAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Fluxo de esqueceu a senha' })
  @ApiOkResponse({ type: SendLinkResetPasswordAuthResponseDto })
  @Post('reset-password')
  async handle(
    @Param('token') token: string,
    @Body() body: ResetPasswordAuthRequestDto,
  ) {
    return await this.resetPasswordAuthUseCase.execute(token, body);
  }
}
