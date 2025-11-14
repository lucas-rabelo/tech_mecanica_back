import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FindByIdTenantStatusUseCase } from '../../../application/use-cases';

@ApiTags('Tenant status')
@Controller('tenant-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdTenantStatusController {
  constructor(
    @Inject(forwardRef(() => FindByIdTenantStatusUseCase))
    private readonly findByIdTenantStatusUseCase: FindByIdTenantStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'FindPermission' })
  @ApiOperation({ summary: 'Finding a Tenant status by ID' })
  @ApiOkResponse()
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdTenantStatusUseCase.execute(id);
  }
}