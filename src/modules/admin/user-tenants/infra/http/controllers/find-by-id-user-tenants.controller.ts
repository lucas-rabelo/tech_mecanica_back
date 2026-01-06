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
import { FindByIdUserTenantsUseCase } from '../../../application/use-cases';
import { ReadUserTenantResponseDto } from '../../../dtos';

@ApiTags('User Tenants')
@Controller('user-tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdUserTenantsController {
  constructor(
    @Inject(forwardRef(() => FindByIdUserTenantsUseCase))
    private readonly findByIdUserTenantsUseCase: FindByIdUserTenantsUseCase,
  ) {}

  @RequireAccess({ module: 'UserTenants', page: 'FindUserTenants' })
  @ApiOperation({ summary: 'Finding a user tenants by ID' })
  @ApiOkResponse({ type: ReadUserTenantResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdUserTenantsUseCase.execute(id);
  }
}
