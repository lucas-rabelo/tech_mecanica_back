import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class DeleteTenantStatusUseCase {
  constructor(private readonly TenantStatusRepository: TenantStatusRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const TenantStatusDeleted = await this.TenantStatusRepository.delete(id);

      if (!TenantStatusDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return TenantStatusDeleted;
    } catch (err) {
      throw err;
    }
  }
}
