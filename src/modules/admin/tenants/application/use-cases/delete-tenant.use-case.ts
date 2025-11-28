import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TenantsRepository } from '../../infra';
import { FindByIdTenantUseCase } from './find-by-id-tenant.use-case';

@Injectable()
export class DeleteTenantUseCase {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly findByIdTenantUseCase: FindByIdTenantUseCase,
  ) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdTenantUseCase.execute(id);

      return this.tenantsRepository.delete(id);
    } catch (err) {
      throw err;
    }
  }
}
