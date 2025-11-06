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
import { CreatePageUseCase } from '../../../application/use-cases';
import { CreatePageRequestDto, ReadPageResponseDto } from '../../../dto';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePagesController {
  constructor(
    @Inject(forwardRef(() => CreatePageUseCase))
    private readonly createPageUseCase: CreatePageUseCase,
  ) {}

  @RequireAccess({ module: 'Pages', page: 'CreatePage' })
  @ApiOperation({ summary: 'Criação de uma nova página' })
  @ApiOkResponse({ type: ReadPageResponseDto })
  @Post()
  async handle(@Body() body: CreatePageRequestDto) {
    return await this.createPageUseCase.execute(body);
  }
}
