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
import { UpdateTenantStatusUseCase } from '../../../application/use-cases';
import {
  CreateTenantStatusRequestDto,
  ReadTenantStatusResponseDto,
} from '../../../dtos';

@ApiTags('Tenant status')
@Controller('tenant-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateTenantStatusController {
  constructor(
    @Inject(forwardRef(() => UpdateTenantStatusUseCase))
    private readonly updateTenantStatusUseCase: UpdateTenantStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'UpdateTenantStatus' })
  @ApiOperation({ summary: 'Updating a Tenant status' })
  @ApiOkResponse({ type: ReadTenantStatusResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateTenantStatusRequestDto,
  ) {
    return await this.updateTenantStatusUseCase.execute(id, body);
  }
}