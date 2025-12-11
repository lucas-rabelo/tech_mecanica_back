import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CustomersRepository } from '../../infra';

@Injectable()
export class DeleteCustomerUseCase {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const customerDeleted = await this.customersRepository.delete(id);

      if (!customerDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return customerDeleted;
    } catch (err) {
      throw err;
    }
  }
}
