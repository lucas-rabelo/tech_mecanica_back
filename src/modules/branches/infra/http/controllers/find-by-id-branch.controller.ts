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
import { FindByIdBranchUseCase } from '../../../application/use-cases';
import { CreateBranchResponseDto } from '../../../dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdBranchController {
  constructor(
    @Inject(forwardRef(() => FindByIdBranchUseCase))
    private readonly findByIdBranchUseCase: FindByIdBranchUseCase,
  ) {}

  @RequireAccess({ module: 'Branches', page: 'FindBranch' })
  @ApiOperation({ summary: 'Busca da filial pelo id' })
  @ApiOkResponse({ type: CreateBranchResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdBranchUseCase.execute(id);
  }
}
