import { Injectable } from '@nestjs/common';
import {
  FilterListCustomersRequestDto,
  ListCustomersResponseDto,
} from '../../dtos';
import { CustomersRepository } from '../../infra';

@Injectable()
export class ListCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(
    request: FilterListCustomersRequestDto,
  ): Promise<ListCustomersResponseDto> {
    try {
      const customersFounded = await this.customersRepository.list(request);

      return customersFounded;
    } catch (err) {
      throw err;
    }
  }
}
