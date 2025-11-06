import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateBranchUseCase } from '../../../application/use-cases';
import { CreateBranchRequestDto, CreateBranchResponseDto } from '../../../dto';

@ApiTags('Branches')
@Controller('branches')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateBranchController {
  constructor(
    @Inject(forwardRef(() => CreateBranchUseCase))
    private readonly createBranchUseCase: CreateBranchUseCase,
  ) {}

  @RequireAccess({ module: 'Branches', page: 'CreateBranch' })
  @ApiOperation({ summary: 'Criação de uma nova filial' })
  @ApiOkResponse({ type: CreateBranchResponseDto })
  @Post()
  async handle(@Body() body: CreateBranchRequestDto) {
    return await this.createBranchUseCase.execute(body);
  }
}
