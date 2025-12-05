import { ErrorBadRequestResponseDto, Public } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginAuthUseCase } from '../../../application/use-cases';
import { LoginAuthRequestDto, SendTokenResponseDto } from '../../../dtos';

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
  async handle(@Body() body: LoginAuthRequestDto) {
    return await this.loginAuthUseCase.execute(body);
  }
}