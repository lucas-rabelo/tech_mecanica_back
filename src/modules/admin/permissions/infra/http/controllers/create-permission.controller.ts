import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreatePermissionUseCase } from '../../../application/use-cases';
import {
  CreatePermissionRequestDto,
  ReadPermissionResponseDto,
} from '../../../dtos';

@ApiTags('Permissions')
@Controller('permissions')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePermissionController {
  constructor(
    @Inject(forwardRef(() => CreatePermissionUseCase))
    private readonly createPermissionUseCase: CreatePermissionUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'CreatePermission' })
  @ApiOperation({ summary: 'Creating a new permission' })
  @ApiOkResponse({ type: ReadPermissionResponseDto })
  @Post()
  async handle(@Body() body: CreatePermissionRequestDto) {
    return await this.createPermissionUseCase.execute(body);
  }
}