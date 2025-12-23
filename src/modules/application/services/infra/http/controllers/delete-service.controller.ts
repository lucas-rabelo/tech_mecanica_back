import {
  DeletedAndUpdatedDataResponseDto,
  ErrorBadRequestResponseDto,
  RequireAccess,
} from '@/src/infra';
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
import { DeleteServiceUseCase } from '../../../application/use-cases';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteServiceController {
  constructor(
    @Inject(forwardRef(() => DeleteServiceUseCase))
    private readonly deleteServiceUseCase: DeleteServiceUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'DeleteService' })
  @ApiOperation({ summary: 'Deleting a service' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteServiceUseCase.execute(id);
  }
}
