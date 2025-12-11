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
import { UpdatePermissionPageUseCase } from '../../../application/use-cases';
import {
  CreatePermissionPageRequestDto,
  ReadPermissionPageResponseDto,
} from '../../../dtos';

@ApiTags('Permission Pages')
@Controller('permission_pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdatePermissionPageController {
  constructor(
    @Inject(forwardRef(() => UpdatePermissionPageUseCase))
    private readonly updatePermissionPageUseCase: UpdatePermissionPageUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionPages', page: 'UpdatePermissionPage' })
  @ApiOperation({ summary: 'Updating a permission page' })
  @ApiOkResponse({ type: ReadPermissionPageResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionPageRequestDto,
  ) {
    return await this.updatePermissionPageUseCase.execute(id, body);
  }
}