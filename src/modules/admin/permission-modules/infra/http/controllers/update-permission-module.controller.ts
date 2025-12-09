import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import { UpdatePermissionModuleUseCase } from '../../../application/use-cases';
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
export class UpdatePermissionModuleController {
  constructor(
    @Inject(forwardRef(() => UpdatePermissionModuleUseCase))
    private readonly updatePermissionModuleUseCase: UpdatePermissionModuleUseCase,
  ) {}

  // @RequireAccess({ module: 'Permission Modules', page: 'UpdatePermission' })
  @ApiOperation({ summary: 'Updating a permission module' })
  @ApiOkResponse({ type: ReadPermissionModuleResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionModuleRequestDto,
  ) {
    return await this.updatePermissionModuleUseCase.execute(id, body);
  }
}