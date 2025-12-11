import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadCustomerResponseDto } from '../../dtos';
import { CustomersRepository } from '../../infra';

@Injectable()
export class FindByIdCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(id: number): Promise<ReadCustomerResponseDto> {
    try {
      const customerFounded = await this.customersRepository.findById(id);

      if (!customerFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return customerFounded;
    } catch (err) {
      throw err;
    }
  }
}
