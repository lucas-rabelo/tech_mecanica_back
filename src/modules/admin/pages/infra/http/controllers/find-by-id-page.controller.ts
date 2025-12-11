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
import { ReadPageResponseDto } from '../../../dtos';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPageController {
  constructor(
    @Inject(forwardRef(() => FindByIdPageUseCase))
    private readonly findByIdPageUseCase: FindByIdPageUseCase,
  ) {}

  @RequireAccess({ module: 'Pages', page: 'FindPage' })
  @ApiOperation({ summary: 'Finding a page by ID' })
  @ApiOkResponse({ type: ReadPageResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPageUseCase.execute(id);
  }
}
