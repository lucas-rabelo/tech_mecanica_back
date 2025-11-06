import {
  ErrorBadRequestResponseDto,
  RequireAccess,
  TenantId,
} from '@/src/infra';
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
import { ListUserUseCase } from '../../../application/use-cases';
import { ListUserRequestDto, ListUserResponseDto } from '../../../dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListUsersController {
  constructor(
    @Inject(forwardRef(() => ListUserUseCase))
    private readonly listUserUseCase: ListUserUseCase,
  ) {}

  @RequireAccess({ module: 'Users', page: 'ListUsers' })
  @ApiOperation({ summary: 'Listagem dos usuários' })
  @ApiOkResponse({ type: [ListUserResponseDto] })
  @Get()
  async handle(
    @Query() filters: ListUserRequestDto,
    @TenantId() tenantId: number,
  ) {
    return await this.listUserUseCase.execute({ ...filters, tenantId });
  }
}
