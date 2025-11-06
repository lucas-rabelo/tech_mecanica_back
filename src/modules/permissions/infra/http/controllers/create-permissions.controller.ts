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
import { CreatePermissionsUseCase } from '../../../application/use-cases';
import {
  CreatePermissionRequestDto,
  ReadPermissionResponseDto,
} from '../../../dto';

@ApiTags('Permissions')
@Controller('permissions')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePermissionController {
  constructor(
    @Inject(forwardRef(() => CreatePermissionsUseCase))
    private readonly createPermissionsUseCase: CreatePermissionsUseCase,
  ) {}

  @RequireAccess({ module: 'Permissions', page: 'CreatePermission' })
  @ApiOperation({ summary: 'Criação de uma nova permissão' })
  @ApiOkResponse({ type: ReadPermissionResponseDto })
  @Post()
  async handle(@Body() body: CreatePermissionRequestDto) {
    return await this.createPermissionsUseCase.execute(body);
  }
}
