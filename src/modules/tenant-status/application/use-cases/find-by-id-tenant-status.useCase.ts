import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantStatusResponseDto } from '../../dto';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class FindByIdTenantStatusUseCase {
  constructor(
    private readonly tenantStatusRepository: TenantStatusRepository,
  ) {}

  async execute(id: number): Promise<CreateTenantStatusResponseDto> {
    const tenantStatusFounded = await this.tenantStatusRepository.findById(id);

    if (!tenantStatusFounded) {
      throw new NotFoundException('Tenant Status not found');
    }

    return tenantStatusFounded;
  }
}
