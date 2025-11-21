import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TenantsRepository } from '../../infra';

@Injectable()
export class DeleteTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const tenantDeleted = await this.tenantsRepository.delete(id);

      if (!tenantDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return tenantDeleted;
    } catch (err) {
      throw err;
    }
  }
}
