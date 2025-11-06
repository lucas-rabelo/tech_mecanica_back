import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantRequestDto, FindByIdTenantResponseDto } from '../../dto';
import { TenantsRepository } from '../../infra';

@Injectable()
export class UpdateTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(
    id: number,
    request: CreateTenantRequestDto,
  ): Promise<FindByIdTenantResponseDto> {
    const tenantUpdated = await this.tenantsRepository.update(id, request);

    if (!tenantUpdated) {
      throw new NotFoundException('We have a problem to update tenant.');
    }

    return tenantUpdated;
  }
}
