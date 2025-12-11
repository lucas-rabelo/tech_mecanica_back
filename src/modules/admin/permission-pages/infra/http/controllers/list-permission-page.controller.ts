import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Controller, forwardRef, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ListPermissionPageUseCase } from '../../../application/use-cases';
import {
  FilterListPermissionPageRequestDto,
  ListPermissionPagesResponseDto,
} from '../../../dtos';

@ApiTags('Permission Pages')
@Controller('permission_pages')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPermissionPageController {
  constructor(
    @Inject(forwardRef(() => ListPermissionPageUseCase))
    private readonly listPermissionPageUseCase: ListPermissionPageUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionPages', page: 'ListPermissionPage' })
  @ApiOperation({ summary: 'List of permission pages' })
  @ApiOkResponse({ type: ListPermissionPagesResponseDto })
  @Get()
  async handle(@Query() filters: FilterListPermissionPageRequestDto) {
    return await this.listPermissionPageUseCase.execute(filters);
  }
}
