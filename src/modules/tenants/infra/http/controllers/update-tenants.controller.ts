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
import { UpdateTenantUseCase } from '../../../application/use-cases';
import { CreateTenantRequestDto, CreateTenantResponseDto } from '../../../dto';

@ApiTags('Tenants')
@Controller('tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateTenantsController {
  constructor(
    @Inject(forwardRef(() => UpdateTenantUseCase))
    private readonly updateTenantUseCase: UpdateTenantUseCase,
  ) {}

  @RequireAccess({ module: 'Tenants', page: 'UpdateTenant' })
  @ApiOperation({ summary: 'Atualização do cliente' })
  @ApiOkResponse({ type: CreateTenantResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTenantRequestDto,
  ) {
    return await this.updateTenantUseCase.execute(id, body);
  }
}
