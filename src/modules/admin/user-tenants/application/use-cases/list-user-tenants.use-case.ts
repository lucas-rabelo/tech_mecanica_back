import { Injectable } from '@nestjs/common';
import {
  FilterListUserTenantRequestDto,
  ListUserTenantsResponseDto,
} from '../../dtos';
import { UserTenantsRepository } from '../../infra';

@Injectable()
export class ListUserTenantsUseCase {
  constructor(private readonly userTenantsRepository: UserTenantsRepository) {}

  async execute(
    request: FilterListUserTenantRequestDto,
  ): Promise<ListUserTenantsResponseDto> {
    try {
      const userTenantsFounded = await this.userTenantsRepository.list(request);

      return userTenantsFounded;
    } catch (err) {
      throw err;
    }
  }
}
