import { Injectable } from '@nestjs/common';
import {
  CreateTenantsRequestDto,
  ReadTenantsResponseDto,
} from '../../dtos';
import { TenantsRepository } from '../../infra';

@Injectable()
export class CreateTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(
    request: CreateTenantsRequestDto,
  ): Promise<ReadTenantsResponseDto> {
    return this.tenantsRepository.create(request);
  }
}
