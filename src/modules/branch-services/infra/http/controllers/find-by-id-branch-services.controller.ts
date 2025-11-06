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
import { FindByIdBranchServicesUseCase } from '../../../application/use-cases';
import { ReadBranchServiceResponseDto } from '../../../dto';

@ApiTags('Branch Services')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdBranchServicesController {
  constructor(
    @Inject(forwardRef(() => FindByIdBranchServicesUseCase))
    private readonly findByIdBranchServicesUseCase: FindByIdBranchServicesUseCase,
  ) {}

  @RequireAccess({ module: 'BranchServices', page: 'FindBranchService' })
  @ApiOperation({ summary: 'Busca do serviço da filial pelo id' })
  @ApiOkResponse({ type: ReadBranchServiceResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdBranchServicesUseCase.execute(id);
  }
}
