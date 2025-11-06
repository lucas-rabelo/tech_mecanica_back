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
import { ListPermissionsUseCase } from '../../../application/use-cases';
import {
  ListPermissionRequestDto,
  ListPermissionResponseDto,
} from '../../../dto';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPermissionController {
  constructor(
    @Inject(forwardRef(() => ListPermissionsUseCase))
    private readonly listPermissionsUseCase: ListPermissionsUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'ListPermission' })
  @ApiOperation({ summary: 'Atualização de uma permissão' })
  @ApiOkResponse({ type: ListPermissionResponseDto })
  @Get()
  async handle(@Query() filters: ListPermissionRequestDto) {
    return await this.listPermissionsUseCase.execute(filters);
  }
}
