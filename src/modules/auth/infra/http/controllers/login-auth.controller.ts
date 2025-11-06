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
import { LoginAuthUseCase } from '../../../application/use-cases';
import { LoginUserAuthRequestDto, SendTokenResponseDto } from '../../../dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@Public()
export class LoginAuthController {
  constructor(
    @Inject(forwardRef(() => LoginAuthUseCase))
    private readonly loginAuthUseCase: LoginAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Autenticação na aplicação' })
  @ApiOkResponse({ type: SendTokenResponseDto })
  @Post('login')
  async handle(@Body() body: LoginUserAuthRequestDto) {
    return await this.loginAuthUseCase.execute(body);
  }
}
