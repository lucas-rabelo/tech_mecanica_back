import { Injectable } from '@nestjs/common';
import {
  CreateTenantStatusResponseDto,
  ListTenantStatusRequestDto,
} from '../../dto';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class ListTenantStatusUseCase {
  constructor(
    private readonly tenantStatusRepository: TenantStatusRepository,
  ) {}

  async execute(
    filters: ListTenantStatusRequestDto,
  ): Promise<CreateTenantStatusResponseDto[]> {
    return this.tenantStatusRepository.list(filters);
  }
}
