import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  ParseIntPipe,
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
import { FindByIdPermissionModulesUseCase } from '../../../application/use-cases';
import { ReadPermissionModulesResponseDto } from '../../../dto';

@ApiTags('Permission Modules')
@Controller('permission-modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPermissionModulesController {
  constructor(
    @Inject(forwardRef(() => FindByIdPermissionModulesUseCase))
    private readonly findByIdPermissionModulesUseCase: FindByIdPermissionModulesUseCase,
  ) {}

  @RequireAccess({
    module: 'PermissionModules',
    page: 'FindPermissionModule',
  })
  @ApiOperation({ summary: 'Busca da modulo na permissão pelo id' })
  @ApiOkResponse({ type: ReadPermissionModulesResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPermissionModulesUseCase.execute(id);
  }
}
