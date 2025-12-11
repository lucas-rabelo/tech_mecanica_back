import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCustomerRequestDto } from '../../dtos';
import { CustomersRepository } from '../../infra';
import { FindByIdCustomerUseCase } from './find-by-id-customer.use-case';

@Injectable()
export class UpdateCustomerUseCase {
  constructor(
    private readonly customersRepository: CustomersRepository,
    private readonly findByIdCustomerUseCase: FindByIdCustomerUseCase,
  ) {}

  async execute(
    id: number,
    request: UpdateCustomerRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdCustomerUseCase.execute(id);

      const customerUpdated = await this.customersRepository.update(
        id,
        request,
      );

      if (!customerUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return customerUpdated;
    } catch (err) {
      throw err;
    }
  }
}
