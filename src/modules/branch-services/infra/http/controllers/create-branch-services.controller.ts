import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
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
import { CreateBranchServicesUseCase } from '../../../application/use-cases';
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
export class CreateBranchServiceController {
  constructor(
    @Inject(forwardRef(() => CreateBranchServicesUseCase))
    private readonly createBranchServicesUseCase: CreateBranchServicesUseCase,
  ) {}

  @RequireAccess({ module: 'BranchServices', page: 'CreateBranchService' })
  @ApiOperation({ summary: 'Criação de novo serviço' })
  @ApiOkResponse({ type: ReadBranchServiceResponseDto })
  @Post()
  async handle(@Body() body: CreateBranchServiceRequestDto) {
    return await this.createBranchServicesUseCase.execute(body);
  }
}
