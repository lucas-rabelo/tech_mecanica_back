import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import { ListPermissionModuleUseCase } from '../../../application/use-cases';
import {
  FilterListPermissionModuleRequestDto,
  ListPermissionModulesResponseDto,
} from '../../../dtos';

@ApiTags('Permission Modules')
@Controller('permission_modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPermissionModuleController {
  constructor(
    @Inject(forwardRef(() => ListPermissionModuleUseCase))
    private readonly listPermissionModuleUseCase: ListPermissionModuleUseCase,
  ) {}

  // @RequireAccess({ module: 'Permission Modules', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of permission modules' })
  @ApiOkResponse({ type: ListPermissionModulesResponseDto })
  @Get()
  async handle(@Query() filters: FilterListPermissionModuleRequestDto) {
    return await this.listPermissionModuleUseCase.execute(filters);
  }
}
