import { Injectable } from '@nestjs/common';
import { CreateTenantStatusRequestDto, CreateTenantStatusResponseDto } from '../../dto';
import { TenantStatusRepository } from '../../infra';

@Injectable()
export class CreateTenantStatusUseCase {
  constructor(
    private readonly tenantStatusRepository: TenantStatusRepository,
  ) {}

  async execute(request: CreateTenantStatusRequestDto): Promise<CreateTenantStatusResponseDto> {
    return this.tenantStatusRepository.create(request);
  }
}
