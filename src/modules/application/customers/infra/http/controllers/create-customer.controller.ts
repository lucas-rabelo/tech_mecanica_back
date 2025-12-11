import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateCustomerUseCase } from '../../../application/use-cases';
import {
  CreateCustomerRequestDto,
  ReadCustomerResponseDto,
} from '../../../dtos';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class CreateCustomerController {
  constructor(
    @Inject(forwardRef(() => CreateCustomerUseCase))
    private readonly createCustomerUseCase: CreateCustomerUseCase,
  ) {}

  @RequireAccess({ module: 'Customers', page: 'CreateCustomer' })
  @ApiOperation({ summary: 'Creating a new customer' })
  @ApiOkResponse({ type: ReadCustomerResponseDto })
  @Post()
  async handle(@Body() body: CreateCustomerRequestDto) {
    return await this.createCustomerUseCase.execute(body);
  }
}
