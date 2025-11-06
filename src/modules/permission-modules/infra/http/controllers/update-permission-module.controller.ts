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
import { UpdatePermissionModuleUseCase } from '../../../application/use-cases';
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
export class UpdatePermissionModulesController {
  constructor(
    @Inject(forwardRef(() => UpdatePermissionModuleUseCase))
    private readonly updatePermissionModuleUseCase: UpdatePermissionModuleUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionModules',
    page: 'UpdatePermissionModule',
  })
  @ApiOperation({ summary: 'Atualização do módulo na permissão' })
  @ApiOkResponse({ type: ReadPermissionModulesResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePermissionModulesRequestDto,
  ) {
    return await this.updatePermissionModuleUseCase.execute(id, body);
  }
}
