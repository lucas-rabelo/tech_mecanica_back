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
import { UpdateBranchContactsUseCase } from '../../../application/use-cases';
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
export class UpdateBranchContactsController {
  constructor(
    @Inject(forwardRef(() => UpdateBranchContactsUseCase))
    private readonly updateBranchContactsUseCase: UpdateBranchContactsUseCase,
  ) {}

  @RequireAccess({ module: 'BranchContacts', page: 'UpdateBranchContact' })
  @ApiOperation({ summary: 'Atualização do contato' })
  @ApiOkResponse({ type: ReadBranchContactResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateBranchContactRequestDto,
  ) {
    return await this.updateBranchContactsUseCase.execute(id, body);
  }
}
