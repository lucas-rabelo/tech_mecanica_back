import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  Delete,
  forwardRef,
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
import { DeleteBranchUseCase } from '../../../application/use-cases';
import { CreateBranchResponseDto } from '../../../dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteBranchController {
  constructor(
    @Inject(forwardRef(() => DeleteBranchUseCase))
    private readonly deleteBranchUseCase: DeleteBranchUseCase,
  ) {}

  @RequireAccess({ module: 'Branches', page: 'DeleteBranch' })
  @ApiOperation({ summary: 'Exclusão da filial' })
  @ApiOkResponse({ type: CreateBranchResponseDto })
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteBranchUseCase.execute(id);
  }
}
