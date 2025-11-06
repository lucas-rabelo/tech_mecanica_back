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
import { ListPermissionModuleUseCase } from '../../../application/use-cases';
import {
  ListPermissionModulesRequestDto,
  ReadPermissionModulesResponseDto,
} from '../../../dto';

@ApiTags('Permission Modules')
@Controller('permission-modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListPermissionModulesController {
  constructor(
    @Inject(forwardRef(() => ListPermissionModuleUseCase))
    private readonly listPermissionModuleUseCase: ListPermissionModuleUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionModules',
    page: 'ListPermissionModule',
  })
  @ApiOperation({ summary: 'Listagem dos módulos na permissão' })
  @ApiOkResponse({ type: [ReadPermissionModulesResponseDto] })
  @Get()
  async handle(@Query() filters: ListPermissionModulesRequestDto) {
    return await this.listPermissionModuleUseCase.execute(filters);
  }
}
