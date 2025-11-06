import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CreateTenantStatusRequestDto,
  CreateTenantStatusResponseDto,
} from '../../dto';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class UpdateTenantStatusUseCase {
  constructor(
    private readonly tenantStatusRepository: TenantStatusRepository,
  ) {}

  async execute(
    id: number,
    request: CreateTenantStatusRequestDto,
  ): Promise<CreateTenantStatusResponseDto> {
    const tenantStatusUpdated = await this.tenantStatusRepository.update(
      id,
      request,
    );

    if (!tenantStatusUpdated) {
      throw new BadRequestException('Tenant Status not updated');
    }

    return tenantStatusUpdated;
  }
}
