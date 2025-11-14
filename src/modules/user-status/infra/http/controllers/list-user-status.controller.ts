import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
import { Controller, forwardRef, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ListUserStatusUseCase } from '../../../application/use-cases';
import {
  FilterListUserStatusRequestDto,
  ListUserStatusResponseDto,
} from '../../../dtos';

@ApiTags('User status')
@Controller('user-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListUserStatusController {
  constructor(
    @Inject(forwardRef(() => ListUserStatusUseCase))
    private readonly listUserStatusUseCase: ListUserStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of user status' })
  @ApiOkResponse({ type: ListUserStatusResponseDto })
  @Get()
  async handle(@Query() filters: FilterListUserStatusRequestDto) {
    return await this.listUserStatusUseCase.execute(filters);
  }
}
