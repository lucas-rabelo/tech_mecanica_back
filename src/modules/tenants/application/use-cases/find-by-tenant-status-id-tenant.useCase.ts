import { Injectable, NotFoundException } from '@nestjs/common';
import { FindByIdTenantResponseDto } from '../../dto';
import { TenantsRepository } from '../../infra';

@Injectable()
export class FindByTenantStatusIdTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(tenantStatusId: number): Promise<FindByIdTenantResponseDto> {
    const tenantFounded = await this.tenantsRepository.findByTenantStatusId(tenantStatusId);

    if(!tenantFounded) {
      throw new NotFoundException('Tenant not founded');
    }

    return tenantFounded;
  }
}
