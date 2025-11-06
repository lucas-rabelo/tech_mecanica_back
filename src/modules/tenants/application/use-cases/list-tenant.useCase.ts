import { Injectable } from '@nestjs/common';
import { ListTenantRequestDto, ListTenantResponseDto } from '../../dto';
import { TenantsRepository } from '../../infra';

@Injectable()
export class ListTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(filters: ListTenantRequestDto): Promise<ListTenantResponseDto> {
    return this.tenantsRepository.list(filters);
  }
}
