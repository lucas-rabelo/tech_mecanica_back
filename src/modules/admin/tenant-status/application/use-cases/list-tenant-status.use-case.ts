import { Injectable } from '@nestjs/common';
import {
  FilterListTenantStatusRequestDto,
  ListTenantStatusResponseDto,
} from '../../dtos';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class ListTenantStatusUseCase {
  constructor(private readonly TenantStatusRepository: TenantStatusRepository) {}

  async execute(
    request: FilterListTenantStatusRequestDto,
  ): Promise<ListTenantStatusResponseDto> {
    try {
      const TenantStatusFounded = await this.TenantStatusRepository.list(request);

      return TenantStatusFounded;
    } catch (err) {
      throw err;
    }
  }
}
