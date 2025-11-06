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
import { ListAllUserStatusUseCase } from '../../../application/use-cases';
import {
  CreateUserStatusResponseDto,
  ListUserStatusRequestDto,
} from '../../../dto';

@ApiTags('User Status')
@Controller('user-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListAllUserStatusController {
  constructor(
    @Inject(forwardRef(() => ListAllUserStatusUseCase))
    private readonly listAllUserStatusUseCase: ListAllUserStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'ListTenantStatus' })
  @ApiOperation({ summary: 'Listagem dos status para usuários' })
  @ApiOkResponse({ type: [CreateUserStatusResponseDto] })
  @Get()
  async handle(@Query() filters: ListUserStatusRequestDto) {
    console.log(filters);

    return await this.listAllUserStatusUseCase.execute(filters);
  }
}
