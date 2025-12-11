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
import { FindByIdUserStatusUseCase } from '../../../application/use-cases';
import { ReadUserStatusResponseDto } from '../../../dtos';

@ApiTags('User status')
@Controller('user-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdUserStatusController {
  constructor(
    @Inject(forwardRef(() => FindByIdUserStatusUseCase))
    private readonly findByIdUserStatusUseCase: FindByIdUserStatusUseCase,
  ) {}

  @RequireAccess({ module: 'UserStatus', page: 'FindUserStatus' })
  @ApiOperation({ summary: 'Finding a user status by ID' })
  @ApiOkResponse({ type: ReadUserStatusResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdUserStatusUseCase.execute(id);
  }
}
