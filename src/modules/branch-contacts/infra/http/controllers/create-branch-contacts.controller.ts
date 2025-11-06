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
import { CreateBranchContactsUseCase } from '../../../application/use-cases';
import {
  CreateBranchContactRequestDto,
  ReadBranchContactResponseDto,
} from '../../../dto';

@ApiTags('Branch Contacts')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateBranchContactController {
  constructor(
    @Inject(forwardRef(() => CreateBranchContactsUseCase))
    private readonly createBranchContactsUseCase: CreateBranchContactsUseCase,
  ) {}

  @RequireAccess({ module: 'BranchContacts', page: 'CreateBranchContact' })
  @ApiOperation({ summary: 'Criação de novo contato' })
  @ApiOkResponse({ type: ReadBranchContactResponseDto })
  @Post()
  async handle(@Body() body: CreateBranchContactRequestDto) {
    return await this.createBranchContactsUseCase.execute(body);
  }
}
