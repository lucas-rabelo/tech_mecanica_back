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
import { UpdateUserTenantsUseCase } from '../../../application/use-cases';
import {
  CreateUserTenantRequestDto,
  ReadUserTenantResponseDto,
} from '../../../dtos';

@ApiTags('User Tenants')
@Controller('user-tenants')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateUserTenantsController {
  constructor(
    @Inject(forwardRef(() => UpdateUserTenantsUseCase))
    private readonly updateUserTenantsUseCase: UpdateUserTenantsUseCase,
  ) {}

  @RequireAccess({ module: 'UserTenants', page: 'UpdateUserTenants' })
  @ApiOperation({ summary: 'Updating a user tenants' })
  @ApiOkResponse({ type: ReadUserTenantResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserTenantRequestDto,
  ) {
    return await this.updateUserTenantsUseCase.execute(id, body);
  }
}