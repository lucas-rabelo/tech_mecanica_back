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
import { CreateUserStatusResponseDto } from '../../../dto';

@ApiTags('User Status')
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

  @RequireAccess({ module: 'TenantStatus', page: 'FindTenantStatus' })
  @ApiOperation({ summary: 'Atualização do status para usuários' })
  @ApiOkResponse({ type: CreateUserStatusResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdUserStatusUseCase.execute(id);
  }
}
