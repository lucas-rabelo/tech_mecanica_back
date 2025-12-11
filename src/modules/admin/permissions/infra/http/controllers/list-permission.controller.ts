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
import { ListPermissionUseCase } from '../../../application/use-cases';
import {
  FilterListPermisssionRequestDto,
  ListPermissionsResponseDto,
} from '../../../dtos';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPermissionController {
  constructor(
    @Inject(forwardRef(() => ListPermissionUseCase))
    private readonly listPermissionUseCase: ListPermissionUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of permissions' })
  @ApiOkResponse({ type: ListPermissionsResponseDto })
  @Get()
  async handle(@Query() filters: FilterListPermisssionRequestDto) {
    return await this.listPermissionUseCase.execute(filters);
  }
}
