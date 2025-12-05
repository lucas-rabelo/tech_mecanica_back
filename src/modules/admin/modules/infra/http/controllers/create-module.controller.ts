import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
import { CreateModuleUseCase } from '../../../application/use-cases';
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
export class CreateModuleController {
  constructor(
    @Inject(forwardRef(() => CreateModuleUseCase))
    private readonly createModuleUseCase: CreateModuleUseCase,
  ) {}

  // @RequireAccess({ module: 'Modules', page: 'CreatePermission' })
  @ApiOperation({ summary: 'Creating a new module' })
  @ApiOkResponse({ type: ReadModuleResponseDto })
  @Post()
  async handle(@Body() body: CreateModuleRequestDto) {
    return await this.createModuleUseCase.execute(body);
  }
}