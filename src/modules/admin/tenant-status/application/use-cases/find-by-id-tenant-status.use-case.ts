import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadTenantStatusResponseDto } from '../../dtos';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class FindByIdTenantStatusUseCase {
  constructor(private readonly TenantStatusRepository: TenantStatusRepository) {}

  async execute(id: number): Promise<ReadTenantStatusResponseDto> {
    try {
      const TenantStatusFounded = await this.TenantStatusRepository.findById(id);

      if (!TenantStatusFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return TenantStatusFounded;
    } catch (err) {
      throw err;
    }
  }
}
