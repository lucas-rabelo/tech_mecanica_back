import {
  ErrorBadRequestResponseDto,
  User,
  type IUserDecorator,
} from '@/src/infra';
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
import { UpdateUserUseCase } from '../../../application/use-cases';
import { CreateUserRequestDto, ReadUserResponseDto } from '../../../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateUserController {
  constructor(
    @Inject(forwardRef(() => UpdateUserUseCase))
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'UpdatePermission' })
  @ApiOperation({ summary: 'Updating a user' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() request: CreateUserRequestDto,
    @User() { isAdmin, tenantId }: IUserDecorator,
  ) {
    return await this.updateUserUseCase.execute({
      id,
      isAdmin,
      tenantId,
      request,
    });
  }
}
