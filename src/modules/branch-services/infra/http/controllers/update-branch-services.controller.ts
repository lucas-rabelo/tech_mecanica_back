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
import { UpdateBranchServicesUseCase } from '../../../application/use-cases';
import {
  CreateBranchServiceRequestDto,
  ReadBranchServiceResponseDto,
} from '../../../dto';

@ApiTags('Branch Services')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateBranchServicesController {
  constructor(
    @Inject(forwardRef(() => UpdateBranchServicesUseCase))
    private readonly updateBranchServicesUseCase: UpdateBranchServicesUseCase,
  ) {}

  @RequireAccess({ module: 'BranchServices', page: 'UpdateBranchService' })
  @ApiOperation({ summary: 'Atualização do serviço' })
  @ApiOkResponse({ type: ReadBranchServiceResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateBranchServiceRequestDto,
  ) {
    return await this.updateBranchServicesUseCase.execute(id, body);
  }
}
