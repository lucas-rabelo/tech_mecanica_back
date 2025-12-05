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
  Param,
  ParseIntPipe,
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
import { FindByIdUserUseCase } from '../../../application/use-cases';
import { ReadUserResponseDto } from '../../../dtos';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
@UseGuards(AuthGuard)
export class FindByIdUserController {
  constructor(
    @Inject(forwardRef(() => FindByIdUserUseCase))
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  // @RequireAccess({ module: 'Users', page: 'FindUser' })
  @ApiOperation({ summary: 'Finding a user by ID' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Get(':id')
  async handle(
    @User() { isAdmin, tenantId }: IUserDecorator,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.findByIdUserUseCase.execute({ isAdmin, tenantId, id });
  }
}
