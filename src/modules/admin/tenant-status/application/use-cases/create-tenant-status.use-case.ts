import { Injectable } from '@nestjs/common';
import {
  CreateTenantStatusRequestDto,
  ReadTenantStatusResponseDto,
} from '../../dtos';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class CreateTenantStatusUseCase {
  constructor(private readonly tenantStatusRepository: TenantStatusRepository) {}

  async execute(
    request: CreateTenantStatusRequestDto,
  ): Promise<ReadTenantStatusResponseDto> {
    return this.tenantStatusRepository.create(request);
  }
}
