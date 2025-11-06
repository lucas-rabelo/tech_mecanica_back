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
import { UpdateUserStatusUseCase } from '../../../application/use-cases';
import {
  CreateUserStatusResponseDto,
  UpdateUserStatusRequestDto,
} from '../../../dto';

@ApiTags('User Status')
@Controller('user-status')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateUserStatusController {
  constructor(
    @Inject(forwardRef(() => UpdateUserStatusUseCase))
    private readonly updateUserStatusUseCase: UpdateUserStatusUseCase,
  ) {}

  @RequireAccess({ module: 'TenantStatus', page: 'UpdateTenantStatus' })
  @ApiOperation({ summary: 'Atualização do status para usuários' })
  @ApiOkResponse({ type: CreateUserStatusResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserStatusRequestDto,
  ) {
    return await this.updateUserStatusUseCase.execute(id, body);
  }
}
