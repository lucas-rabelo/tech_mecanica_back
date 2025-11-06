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
import { ListBranchServicesUseCase } from '../../../application/use-cases';
import {
  ListBranchServiceRequestDto,
  ListBranchServiceResponseDto,
} from '../../../dto';

@ApiTags('Branch Services')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListBranchServicesController {
  constructor(
    @Inject(forwardRef(() => ListBranchServicesUseCase))
    private readonly listBranchServicesUseCase: ListBranchServicesUseCase,
  ) {}

  @RequireAccess({ module: 'BranchServices', page: 'ListBranchService' })
  @ApiOperation({ summary: 'Listagem dos serviços' })
  @ApiOkResponse({ type: [ListBranchServiceResponseDto] })
  @Get()
  async handle(@Query() filters: ListBranchServiceRequestDto) {
    return await this.listBranchServicesUseCase.execute(filters);
  }
}
