import {
  DeletedAndUpdatedDataResponseDto,
  ErrorBadRequestResponseDto,
  RequireAccess,
} from '@/src/infra';
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
import { UpdateServiceUseCase } from '../../../application/use-cases';
import { UpdateServiceRequestDto } from '../../../dtos';

@ApiTags('Services')
@Controller('services')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateServiceController {
  constructor(
    @Inject(forwardRef(() => UpdateServiceUseCase))
    private readonly updateServiceUseCase: UpdateServiceUseCase,
  ) {}

  @RequireAccess({ module: 'Services', page: 'UpdateService' })
  @ApiOperation({ summary: 'Updating a service' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateServiceRequestDto,
  ) {
    return await this.updateServiceUseCase.execute(id, body);
  }
}
