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
import { FindByIdUserUseCase } from '../../../application/use-cases';
import { ReadUserResponseDto } from '../../../dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdUsersController {
  constructor(
    @Inject(forwardRef(() => FindByIdUserUseCase))
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  @RequireAccess({ module: 'Users', page: 'FindUser' })
  @ApiOperation({ summary: 'Busca do usuário pelo id' })
  @ApiOkResponse({ type: ReadUserResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdUserUseCase.execute(id);
  }
}
