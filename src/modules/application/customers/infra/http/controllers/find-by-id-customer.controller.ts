import { ErrorBadRequestResponseDto, RequireAccess } from '@/src/infra';
import {
  Controller,
  forwardRef,
  Get,
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
import { FindByIdCustomerUseCase } from '../../../application/use-cases';
import { ReadCustomerResponseDto } from '../../../dtos';

@ApiTags('Customers')
@Controller('customers')
@ApiBearerAuth()
@ApiBadRequestResponse({ type: ErrorBadRequestResponseDto })
@ApiUnauthorizedResponse({ type: ErrorBadRequestResponseDto })
@ApiInternalServerErrorResponse({ type: ErrorBadRequestResponseDto })
export class FindByIdCustomerController {
  constructor(
    @Inject(forwardRef(() => FindByIdCustomerUseCase))
    private readonly findByIdCustomerUseCase: FindByIdCustomerUseCase,
  ) {}

  @RequireAccess({ module: 'Customers', page: 'FindCustomer' })
  @ApiOperation({ summary: 'Finding a customer by ID' })
  @ApiOkResponse({ type: ReadCustomerResponseDto })
  @Get(':id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.findByIdCustomerUseCase.execute(id);
  }
}
