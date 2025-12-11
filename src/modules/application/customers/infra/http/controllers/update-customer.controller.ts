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
import { UpdateCustomerUseCase } from '../../../application/use-cases';
import { UpdateCustomerRequestDto } from '../../../dtos';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class UpdateCustomerController {
  constructor(
    @Inject(forwardRef(() => UpdateCustomerUseCase))
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
  ) {}

  @RequireAccess({ module: 'Customers', page: 'UpdateCustomer' })
  @ApiOperation({ summary: 'Updating a customer' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Put(':id')
  async handle(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCustomerRequestDto,
  ) {
    return await this.updateCustomerUseCase.execute(id, body);
  }
}
