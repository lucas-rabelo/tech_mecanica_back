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
import { FindByIdTenantStatusUseCase } from '../../../application/use-cases';
import { CreateTenantStatusResponseDto } from '../../../dto';

@ApiTags('Tenant Status')
@Controller('tenant-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdStatusController {
  constructor(
    @Inject(forwardRef(() => FindByIdTenantStatusUseCase))
    private readonly findByIdTenantStatusUseCase: FindByIdTenantStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'FindTenantStatus' })
  @ApiOperation({ summary: 'Busca do status do cliente pelo id' })
  @ApiOkResponse({ type: CreateTenantStatusResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdTenantStatusUseCase.execute(id);
  }
}
