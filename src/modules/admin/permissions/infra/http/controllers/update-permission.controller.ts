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
import { UpdatePermissionUseCase } from '../../../application/use-cases';
import {
  CreatePermissionRequestDto,
  ReadPermissionResponseDto,
} from '../../../dtos';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdatePermissionController {
  constructor(
    @Inject(forwardRef(() => UpdatePermissionUseCase))
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'UpdatePermission' })
  @ApiOperation({ summary: 'Updating a permission' })
  @ApiOkResponse({ type: ReadPermissionResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionRequestDto,
  ) {
    return await this.updatePermissionUseCase.execute(id, body);
  }
}