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
import { RegisterAuthUseCase } from '../../../application/use-cases';
import { RegisterUserAuthRequestDto, SendTokenResponseDto } from '../../../dto';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@Public()
export class RegisterAuthController {
  constructor(
    @Inject(forwardRef(() => RegisterAuthUseCase))
    private readonly registerAuthUseCase: RegisterAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Criação de conta na aplicação' })
  @ApiOkResponse({ type: SendTokenResponseDto })
  @Post('register')
  async handle(@Body() body: RegisterUserAuthRequestDto) {
    return await this.registerAuthUseCase.execute(body);
  }
}
