import { Injectable, NotFoundException } from '@nestjs/common';
import { FindByIdTenantResponseDto } from '../../dto';
import { TenantsRepository } from '../../infra';

@Injectable()
export class FindByIdTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(id: number): Promise<FindByIdTenantResponseDto> {
    const tenantFounded = await this.tenantsRepository.findById(id);

    if(!tenantFounded) {
      throw new NotFoundException('Tenant not founded');
    }

    return tenantFounded;
  }
}
