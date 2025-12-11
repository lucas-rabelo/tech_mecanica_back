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
import { UpdateModuleUseCase } from '../../../application/use-cases';
import {
  CreateModuleRequestDto,
  ReadModuleResponseDto,
} from '../../../dtos';

@ApiTags('Modules')
@Controller('modules')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateModuleController {
  constructor(
    @Inject(forwardRef(() => UpdateModuleUseCase))
    private readonly updateModuleUseCase: UpdateModuleUseCase,
  ) {}

  @RequireAccess({ module: 'Modules', page: 'UpdateModule' })
  @ApiOperation({ summary: 'Updating a module' })
  @ApiOkResponse({ type: ReadModuleResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateModuleRequestDto,
  ) {
    return await this.updateModuleUseCase.execute(id, body);
  }
}