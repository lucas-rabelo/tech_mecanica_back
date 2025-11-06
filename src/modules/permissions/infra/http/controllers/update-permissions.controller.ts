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
import { UpdatePermissionsUseCase } from '../../../application/use-cases';
import {
  CreatePermissionRequestDto,
  UpdatePermissionResponseDto,
} from '../../../dto';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdatePermissionController {
  constructor(
    @Inject(forwardRef(() => UpdatePermissionsUseCase))
    private readonly updatePermissionsUseCase: UpdatePermissionsUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'UpdatePermission' })
  @ApiOperation({ summary: 'Atualização de uma permissão' })
  @ApiOkResponse({ type: UpdatePermissionResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionRequestDto,
  ) {
    return await this.updatePermissionsUseCase.execute(id, body);
  }
}
