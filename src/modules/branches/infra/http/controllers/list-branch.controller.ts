import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Controller, forwardRef, Get, Inject, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ListBranchUseCase } from '../../../application/use-cases';
import { ListBranchRequestDto, ListBranchResponseDto } from '../../../dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListBranchController {
  constructor(
    @Inject(forwardRef(() => ListBranchUseCase))
    private readonly listBranchUseCase: ListBranchUseCase,
  ) {}

  @RequireAccess({ module: 'Branches', page: 'ListBranch' })
  @ApiOperation({ summary: 'Listagem das filiais' })
  @ApiOkResponse({ type: ListBranchResponseDto })
  @Get()
  async handle(@Query() filters: ListBranchRequestDto) {
    return await this.listBranchUseCase.execute(filters);
  }
}
