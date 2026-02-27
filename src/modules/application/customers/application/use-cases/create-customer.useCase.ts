import { Injectable } from '@nestjs/common';
import { CreateCustomerRequestDto } from '../../dtos';
import { CustomersRepository } from '../../infra';

@Injectable()
export class CreateCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(data: CreateCustomerRequestDto) {
    return this.customersRepository.create(data);
  }
}
