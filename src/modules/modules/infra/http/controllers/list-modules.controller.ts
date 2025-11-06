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
import { ListModuleUseCase } from '../../../application/use-cases';
import { ListModuleRequestDto, ReadModuleResponseDto } from '../../../dto';

@ApiTags('Modules')
@Controller('modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListModulesController {
  constructor(
    @Inject(forwardRef(() => ListModuleUseCase))
    private readonly listModuleUseCase: ListModuleUseCase,
  ) {}

  @RequireAccess({ module: 'Modules', page: 'ListModule' })
  @ApiOperation({ summary: 'Listagem dos módulos' })
  @ApiOkResponse({ type: [ReadModuleResponseDto] })
  @Get()
  async handle(@Query() filters: ListModuleRequestDto) {
    return await this.listModuleUseCase.execute(filters);
  }
}
