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
  CreatePermissionModulesRequestDto,
  ReadPermissionModulesResponseDto,
} from '../../../dto';

@ApiTags('Permission Modules')
@Controller('permission-modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreatePermissionModulesController {
  constructor(
    @Inject(forwardRef(() => CreatePermissionModuleUseCase))
    private readonly createPermissionModuleUseCase: CreatePermissionModuleUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionModules',
    page: 'CreatePermissionModule',
  })
  @ApiOperation({ summary: 'Adição de um módulo para uma permissão' })
  @ApiOkResponse({ type: ReadPermissionModulesResponseDto })
  @Post()
  async handle(@Body() body: CreatePermissionModulesRequestDto) {
    return await this.createPermissionModuleUseCase.execute(body);
  }
}
