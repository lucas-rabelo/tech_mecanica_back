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
import { ListCustomerUseCase } from '../../../application/use-cases';
import {
  FilterListCustomersRequestDto,
  ListCustomersResponseDto,
} from '../../../dtos';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class ListCustomerController {
  constructor(
    @Inject(forwardRef(() => ListCustomerUseCase))
    private readonly listCustomerUseCase: ListCustomerUseCase,
  ) {}

  @RequireAccess({ module: 'Customers', page: 'ListCustomer' })
  @ApiOperation({ summary: 'List of customers' })
  @ApiOkResponse({ type: ListCustomersResponseDto })
  @Get()
  async handle(@Query() filters: FilterListCustomersRequestDto) {
    return await this.listCustomerUseCase.execute(filters);
  }
}
