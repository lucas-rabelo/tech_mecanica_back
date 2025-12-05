import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import {
  CreatePageRequestDto,
  ReadPageResponseDto,
} from '../../../dtos';

@ApiTags('Pages')
@Controller('pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePageController {
  constructor(
    @Inject(forwardRef(() => CreatePageUseCase))
    private readonly createPageUseCase: CreatePageUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'CreatePermission' })
  @ApiOperation({ summary: 'Creating a new page' })
  @ApiOkResponse({ type: ReadPageResponseDto })
  @Post()
  async handle(@Body() body: CreatePageRequestDto) {
    return await this.createPageUseCase.execute(body);
  }
}