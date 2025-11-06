import { FindByTenantStatusIdTenantUseCase } from '@/src/modules/tenants';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindTenantStatusInTenantService {
  constructor(
    private readonly findByTenantStatusIdTenantUseCase: FindByTenantStatusIdTenantUseCase,
  ) {}

  async execute(tenantStatusId: number): Promise<boolean> {
    const hasTenantUsingTenantStatus =
      await this.findByTenantStatusIdTenantUseCase.execute(tenantStatusId);

    return Boolean(hasTenantUsingTenantStatus);
  }
}
