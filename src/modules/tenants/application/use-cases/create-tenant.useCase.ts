import { Injectable } from '@nestjs/common';
import { CreateTenantRequestDto, FindByIdTenantResponseDto } from '../../dto';
import { TenantsRepository } from '../../infra';

@Injectable()
export class CreateTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(
    request: CreateTenantRequestDto,
  ): Promise<FindByIdTenantResponseDto> {
    return this.tenantsRepository.create(request);
  }
}
