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
import { DeleteBranchServicesUseCase } from '../../../application/use-cases';

@ApiTags('Branch Services')
@Controller('branch-services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteBranchServiceController {
  constructor(
    @Inject(forwardRef(() => DeleteBranchServicesUseCase))
    private readonly deleteBranchServicesUseCase: DeleteBranchServicesUseCase,
  ) {}

  @RequireAccess({ module: 'BranchServices', page: 'DeleteBranchService' })
  @ApiOperation({ summary: 'Exclusão do serviço' })
  @ApiOkResponse()
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteBranchServicesUseCase.execute(id);
  }
}
