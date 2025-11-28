import { ErrorBadRequestResponseDto, /*RequireAccess*/ } from '@/src/infra';
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
  // ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateUserStatusUseCase } from '../../../application/use-cases';
import {
  CreateUserStatusRequestDto,
  ReadUserStatusResponseDto,
} from '../../../dtos';

@ApiTags('User status')
@Controller('user-status')
// @ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateUserStatusController {
  constructor(
    @Inject(forwardRef(() => UpdateUserStatusUseCase))
    private readonly updateUserStatusUseCase: UpdateUserStatusUseCase,
  ) {}

  // @RequireAccess({ module: 'Permissions', page: 'UpdatePermission' })
  @ApiOperation({ summary: 'Updating a user status' })
  @ApiOkResponse({ type: ReadUserStatusResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateUserStatusRequestDto,
  ) {
    return await this.updateUserStatusUseCase.execute(id, body);
  }
}