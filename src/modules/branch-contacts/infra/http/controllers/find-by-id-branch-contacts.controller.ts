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
import { FindByIdBranchContactsUseCase } from '../../../application/use-cases';
import { ReadBranchContactResponseDto } from '../../../dto';

@ApiTags('Branch Contacts')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdBranchContactsController {
  constructor(
    @Inject(forwardRef(() => FindByIdBranchContactsUseCase))
    private readonly findByIdBranchContactsUseCase: FindByIdBranchContactsUseCase,
  ) {}

  @RequireAccess({ module: 'BranchContacts', page: 'FindBranchContact' })
  @ApiOperation({ summary: 'Busca do contato da filial pelo id' })
  @ApiOkResponse({ type: ReadBranchContactResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdBranchContactsUseCase.execute(id);
  }
}
