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
import { ListBranchContactsUseCase } from '../../../application/use-cases';
import {
  ListBranchContactRequestDto,
  ListBranchContactResponseDto,
} from '../../../dto';

@ApiTags('Branch Contacts')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListBranchContactsController {
  constructor(
    @Inject(forwardRef(() => ListBranchContactsUseCase))
    private readonly listBranchContactsUseCase: ListBranchContactsUseCase,
  ) {}

  @RequireAccess({ module: 'BranchContacts', page: 'ListBranchContact' })
  @ApiOperation({ summary: 'Listagem dos contatos' })
  @ApiOkResponse({ type: [ListBranchContactResponseDto] })
  @Get()
  async handle(@Query() filters: ListBranchContactRequestDto) {
    return await this.listBranchContactsUseCase.execute(filters);
  }
}
