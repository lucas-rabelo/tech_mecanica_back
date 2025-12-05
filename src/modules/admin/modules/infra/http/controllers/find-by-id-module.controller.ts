import { ErrorBadRequestResponseDto /*RequireAccess*/ } from '@/src/infra';
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
import { ReadModuleResponseDto } from '../../../dtos';

@ApiTags('Modules')
@Controller('modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdModuleController {
  constructor(
    @Inject(forwardRef(() => FindByIdModuleUseCase))
    private readonly findByIdModuleUseCase: FindByIdModuleUseCase,
  ) {}

  // @RequireAccess({ module: 'Modules', page: 'FindPermission' })
  @ApiOperation({ summary: 'Finding a module by ID' })
  @ApiOkResponse({ type: ReadModuleResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdModuleUseCase.execute(id);
  }
}
