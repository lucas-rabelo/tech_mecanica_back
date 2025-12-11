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
import { FindByIdPermissionModuleUseCase } from '../../../application/use-cases';
import { ReadPermissionModuleResponseDto } from '../../../dtos';

@ApiTags('Permission Modules')
@Controller('permission_modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdPermissionModuleController {
  constructor(
    @Inject(forwardRef(() => FindByIdPermissionModuleUseCase))
    private readonly findByIdPermissionModuleUseCase: FindByIdPermissionModuleUseCase,
  ) {}

  @RequireAccess({ module: 'PermissionModules', page: 'FindPermissionModule' })
  @ApiOperation({ summary: 'Finding a module by ID' })
  @ApiOkResponse({ type: ReadPermissionModuleResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdPermissionModuleUseCase.execute(id);
  }
}
