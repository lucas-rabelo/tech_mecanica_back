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
import { IdentifyAuthUseCase } from '../../../application/use-cases';
import {
  IdentifyAuthRequestDto,
  IdentifyAuthResponseDto,
} from '../../../dtos';

@ApiTags('Auth')
@Controller('auth')
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@Public()
export class IdentifyAuthController {
  constructor(
    @Inject(forwardRef(() => IdentifyAuthUseCase))
    private readonly identifyAuthUseCase: IdentifyAuthUseCase,
  ) {}

  @ApiOperation({ summary: 'Fluxo de identificação do usuário' })
  @ApiOkResponse({ type: IdentifyAuthResponseDto })
  @Post('identify')
  async handle(@Body() body: IdentifyAuthRequestDto) {
    return await this.identifyAuthUseCase.execute(body);
  }
}