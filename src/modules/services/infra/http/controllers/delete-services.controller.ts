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
import { DeleteServicesUseCase } from '../../../application/use-cases';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteServiceController {
  constructor(
    @Inject(forwardRef(() => DeleteServicesUseCase))
    private readonly deleteServicesUseCase: DeleteServicesUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'DeleteService' })
  @ApiOperation({ summary: 'Exclusão do serviço' })
  @ApiOkResponse()
  @Delete(':id')
  handle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteServicesUseCase.execute(id);
  }
}
