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
import { UpdateBranchUseCase } from '../../../application/use-cases';
import { CreateBranchRequestDto, CreateBranchResponseDto } from '../../../dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateBranchController {
  constructor(
    @Inject(forwardRef(() => UpdateBranchUseCase))
    private readonly updateBranchUseCase: UpdateBranchUseCase,
  ) {}

  @RequireAccess({ module: 'Branches', page: 'UpdateBranch' })
  @ApiOperation({ summary: 'Atualização da filial' })
  @ApiOkResponse({ type: CreateBranchResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateBranchRequestDto,
  ) {
    return await this.updateBranchUseCase.execute(id, body);
  }
}
