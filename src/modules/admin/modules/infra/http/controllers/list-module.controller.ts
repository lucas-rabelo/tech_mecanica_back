import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import {
  FilterListModuleRequestDto,
  ListModulesResponseDto,
} from '../../../dtos';

@ApiTags('Modules')
@Controller('modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListModuleController {
  constructor(
    @Inject(forwardRef(() => ListModuleUseCase))
    private readonly listModuleUseCase: ListModuleUseCase,
  ) {}

  // @RequireAccess({ module: 'Modules', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of modules' })
  @ApiOkResponse({ type: ListModulesResponseDto })
  @Get()
  async handle(@Query() filters: FilterListModuleRequestDto) {
    return await this.listModuleUseCase.execute(filters);
  }
}
