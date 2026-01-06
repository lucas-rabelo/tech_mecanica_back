import { Injectable } from '@nestjs/common';
import {
  CreateUserTenantRequestDto,
  ReadUserTenantResponseDto,
} from '../../dtos';
import { UserTenantsRepository } from '../../infra';

@Injectable()
export class CreateUserTenantsUseCase {
  constructor(private readonly userTenantsRepository: UserTenantsRepository) {}

  async execute(
    request: CreateUserTenantRequestDto,
  ): Promise<ReadUserTenantResponseDto> {
    return this.userTenantsRepository.create(request);
  }
}
