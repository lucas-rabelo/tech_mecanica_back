import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Body,
  Controller,
  forwardRef,
  Inject,
  Param,
  ParseIntPipe,
  Put,
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
import { UpdatePageUseCase } from '../../../application/use-cases';
import { CreatePageRequestDto, ReadPageResponseDto } from '../../../dto';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdatePagesController {
  constructor(
    @Inject(forwardRef(() => UpdatePageUseCase))
    private readonly updatePageUseCase: UpdatePageUseCase,
  ) {}

  @RequireAccess({ module: 'Pages', page: 'UpdatePage' })
  @ApiOperation({ summary: 'Atualização da página' })
  @ApiOkResponse({ type: ReadPageResponseDto })
  @Put(':id')
  async handle(@Param('id', ParseIntPipe) id: number, @Body() body: CreatePageRequestDto) {
    return await this.updatePageUseCase.execute(id, body);
  }
}
