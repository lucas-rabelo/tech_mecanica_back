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
  CreatePermissionPageRequestDto,
  ReadPermissionPageResponseDto,
} from '../../../dtos';

@ApiTags('Permission Pages')
@Controller('permission_pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePermissionPageController {
  constructor(
    @Inject(forwardRef(() => CreatePermissionPageUseCase))
    private readonly createPermissionPageUseCase: CreatePermissionPageUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionPages', page: 'CreatePermissionPage' })
  @ApiOperation({ summary: 'Creating a new permission page' })
  @ApiOkResponse({ type: ReadPermissionPageResponseDto })
  @Post()
  async handle(@Body() body: CreatePermissionPageRequestDto) {
    return await this.createPermissionPageUseCase.execute(body);
  }
}