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
import { FindByIdServicesUseCase } from '../../../application/use-cases';
import { ReadServiceResponseDto } from '../../../dto';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdServicesController {
  constructor(
    @Inject(forwardRef(() => FindByIdServicesUseCase))
    private readonly findByIdServicesUseCase: FindByIdServicesUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'FindService' })
  @ApiOperation({ summary: 'Busca do serviço pelo id' })
  @ApiOkResponse({ type: ReadServiceResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdServicesUseCase.execute(id);
  }
}
