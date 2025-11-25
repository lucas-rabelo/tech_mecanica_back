import { ErrorBadRequestResponseDto /*RequireAccess*/ } from '@/src/infra';
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
import { ListUserUseCase } from '../../../application/use-cases';
import { FilterListUserRequestDto, ListUserResponseDto } from '../../../dtos';

@ApiTags('Users')
@Controller('users')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListUserController {
  constructor(
    @Inject(forwardRef(() => ListUserUseCase))
    private readonly listUserUseCase: ListUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of users' })
  @ApiOkResponse({ type: ListUserResponseDto })
  @Get()
  async handle(@Query() filters: FilterListUserRequestDto) {
    return await this.listUserUseCase.execute(filters);
  }
}
