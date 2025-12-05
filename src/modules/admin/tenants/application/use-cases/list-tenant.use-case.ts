import { Injectable } from '@nestjs/common';
import {
  FiltersListTenantsRequestDto,
  ListTenantsResponseDto,
} from '../../dtos';
import { TenantsRepository } from '../../infra';

@Injectable()
export class ListTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(
    request: FiltersListTenantsRequestDto,
  ): Promise<ListTenantsResponseDto> {
    try {
      const tenantsFounded = await this.tenantsRepository.list(request);

      return tenantsFounded;
    } catch (err) {
      throw err;
    }
  }
}
