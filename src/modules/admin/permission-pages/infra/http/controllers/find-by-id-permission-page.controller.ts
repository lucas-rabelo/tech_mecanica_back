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
import { FindByIdPermissionPageUseCase } from '../../../application/use-cases';
import { ReadPermissionPageResponseDto } from '../../../dtos';

@ApiTags('Permission Pages')
@Controller('permission_pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPermissionPageController {
  constructor(
    @Inject(forwardRef(() => FindByIdPermissionPageUseCase))
    private readonly findByIdPermissionPageUseCase: FindByIdPermissionPageUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionPages', page: 'FindPermissionPage' })
  @ApiOperation({ summary: 'Finding a module by ID' })
  @ApiOkResponse({ type: ReadPermissionPageResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPermissionPageUseCase.execute(id);
  }
}
