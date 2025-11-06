import { Injectable } from '@nestjs/common';
import { TenantsRepository } from '../../infra';
import { FindByIdTenantUseCase } from './find-by-id-tenant.useCase';

@Injectable()
export class DeleteTenantUseCase {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly findByIdTenantUseCase: FindByIdTenantUseCase
  ) {}

  async execute(id: number): Promise<any> {
    await this.findByIdTenantUseCase.execute(id);

    return this.tenantsRepository.delete(id);
  }
}
