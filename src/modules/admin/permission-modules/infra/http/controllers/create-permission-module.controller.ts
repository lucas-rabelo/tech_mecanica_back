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
import { CreatePermissionModuleUseCase } from '../../../application/use-cases';
import {
  CreatePermissionModuleRequestDto,
  ReadPermissionModuleResponseDto,
} from '../../../dtos';

@ApiTags('Permission Modules')
@Controller('permission_modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePermissionModuleController {
  constructor(
    @Inject(forwardRef(() => CreatePermissionModuleUseCase))
    private readonly createPermissionModuleUseCase: CreatePermissionModuleUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionModules', page: 'CreatePermissionModule' })
  @ApiOperation({ summary: 'Creating a new permission module' })
  @ApiOkResponse({ type: ReadPermissionModuleResponseDto })
  @Post()
  async handle(@Body() body: CreatePermissionModuleRequestDto) {
    return await this.createPermissionModuleUseCase.execute(body);
  }
}