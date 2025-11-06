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
import { DeleteBranchContactsUseCase } from '../../../application/use-cases';

@ApiTags('Branch Contacts')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteBranchContactController {
  constructor(
    @Inject(forwardRef(() => DeleteBranchContactsUseCase))
    private readonly deleteBranchContactsUseCase: DeleteBranchContactsUseCase,
  ) {}

  @RequireAccess({ module: 'BranchContacts', page: 'DeleteBranchContact' })
  @ApiOperation({ summary: 'Exclusão do contato' })
  @ApiOkResponse()
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteBranchContactsUseCase.execute(id);
  }
}
