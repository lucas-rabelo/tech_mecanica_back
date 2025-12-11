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
import { DeleteCustomerUseCase } from '../../../application/use-cases';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class DeleteCustomerController {
  constructor(
    @Inject(forwardRef(() => DeleteCustomerUseCase))
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
  ) {}

  @RequireAccess({ module: 'Customers', page: 'DeleteCustomer' })
  @ApiOperation({ summary: 'Deleting a customer' })
  @ApiOkResponse({ type: DeletedAndUpdatedDataResponseDto })
  @Delete(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteCustomerUseCase.execute(id);
  }
}
