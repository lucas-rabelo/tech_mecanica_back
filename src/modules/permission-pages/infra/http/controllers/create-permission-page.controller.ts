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
import { CreatePermissionPageUseCase } from '../../../application/use-cases';
import {
  CreatePermissionPagesRequestDto,
  ReadPermissionPagesResponseDto,
} from '../../../dto';

@ApiTags('Permission Pages')
@Controller('permission-pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePermissionPagesController {
  constructor(
    @Inject(forwardRef(() => CreatePermissionPageUseCase))
    private readonly createPermissionPageUseCase: CreatePermissionPageUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionPages',
    page: 'CreatePermissionPage',
  })
  @ApiOperation({ summary: 'Adição de uma página para uma permissão' })
  @ApiOkResponse({ type: ReadPermissionPagesResponseDto })
  @Post()
  async handle(@Body() body: CreatePermissionPagesRequestDto) {
    return await this.createPermissionPageUseCase.execute(body);
  }
}
