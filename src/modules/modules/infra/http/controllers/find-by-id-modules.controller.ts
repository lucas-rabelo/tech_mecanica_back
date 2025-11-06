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
import { FindByIdModuleUseCase } from '../../../application/use-cases';
import { ReadModuleResponseDto } from '../../../dto';

@ApiTags('Modules')
@Controller('modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdModulesController {
  constructor(
    @Inject(forwardRef(() => FindByIdModuleUseCase))
    private readonly findByIdModuleUseCase: FindByIdModuleUseCase,
  ) {}

  @RequireAccess({ module: 'Modules', page: 'FindModule' })
  @ApiOperation({ summary: 'Busca do módulo pelo id' })
  @ApiOkResponse({ type: ReadModuleResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdModuleUseCase.execute(id);
  }
}
