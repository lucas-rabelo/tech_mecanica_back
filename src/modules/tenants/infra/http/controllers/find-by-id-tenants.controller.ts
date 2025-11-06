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
import { FindByIdTenantUseCase } from '../../../application/use-cases';
import { CreateTenantResponseDto } from '../../../dto';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdTenantsController {
  constructor(
    @Inject(forwardRef(() => FindByIdTenantUseCase))
    private readonly findByIdTenantUseCase: FindByIdTenantUseCase,
  ) {}

  @RequireAccess({ module: 'Tenants', page: 'FindTenant' })
  @ApiOperation({ summary: 'Busca do cliente pelo id' })
  @ApiOkResponse({ type: CreateTenantResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdTenantUseCase.execute(id);
  }
}
