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
import { ForgetPasswordAuthUseCase } from '../../../application/use-cases';
import {
  ForgetPasswordAuthRequestDto,
  SendLinkResetPasswordAuthResponseDto,
} from '../../../dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@Public()
export class ForgetPasswordAuthController {
  constructor(
    @Inject(forwardRef(() => ForgetPasswordAuthUseCase))
    private readonly forgetPasswordAuthUseCase: ForgetPasswordAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Fluxo de esqueceu a senha' })
  @ApiOkResponse({ type: SendLinkResetPasswordAuthResponseDto })
  @Post('forget-password')
  async handle(@Body() body: ForgetPasswordAuthRequestDto) {
    return await this.forgetPasswordAuthUseCase.execute(body);
  }
}
