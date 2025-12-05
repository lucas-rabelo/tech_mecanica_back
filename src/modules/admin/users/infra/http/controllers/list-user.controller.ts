import {
  AuthGuard,
  ErrorBadRequestResponseDto,
  User,
  type IUserDecorator,
} from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
  Inject,
  Query,
  UseGuards,
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
import { ListUserUseCase } from '../../../application/use-cases';
import { FilterListUserRequestDto, ListUserResponseDto } from '../../../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@UseGuards(AuthGuard)
export class ListUserController {
  constructor(
    @Inject(forwardRef(() => ListUserUseCase))
    private readonly listUserUseCase: ListUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'ListPermission' })
  @ApiOperation({ summary: 'List of users' })
  @ApiOkResponse({ type: ListUserResponseDto })
  @Get()
  async handle(
    @User() { isAdmin, tenantId }: IUserDecorator,
    @Query() request: FilterListUserRequestDto,
  ) {
    return await this.listUserUseCase.execute({ isAdmin, tenantId, request });
  }
}
