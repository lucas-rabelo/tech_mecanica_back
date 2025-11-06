import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindByIdPageUseCase } from '../../../application/use-cases';
import { ReadPageResponseDto } from '../../../dto';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPagesController {
  constructor(
    @Inject(forwardRef(() => FindByIdPageUseCase))
    private readonly findByIdPageUseCase: FindByIdPageUseCase,
  ) {}

  @RequireAccess({ module: 'Pages', page: 'FindPage' })
  @ApiOperation({ summary: 'Busca da página pelo id' })
  @ApiOkResponse({ type: ReadPageResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPageUseCase.execute(id);
  }
}
