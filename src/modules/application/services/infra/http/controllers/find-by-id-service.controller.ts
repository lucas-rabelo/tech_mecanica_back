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
import { FindByIdServiceUseCase } from '../../../application/use-cases';
import { ReadServiceResponseDto } from '../../../dtos';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdServiceController {
  constructor(
    @Inject(forwardRef(() => FindByIdServiceUseCase))
    private readonly findByIdServiceUseCase: FindByIdServiceUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'FindService' })
  @ApiOperation({ summary: 'Finding a service by ID' })
  @ApiOkResponse({ type: ReadServiceResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdServiceUseCase.execute(id);
  }
}
