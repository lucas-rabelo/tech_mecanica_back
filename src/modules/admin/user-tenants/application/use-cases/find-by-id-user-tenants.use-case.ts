import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadUserTenantResponseDto } from '../../dtos';
import { UserTenantsRepository } from '../../infra';

@Injectable()
export class FindByIdUserTenantsUseCase {
  constructor(private readonly userTenantsRepository: UserTenantsRepository) {}

  async execute(id: number): Promise<ReadUserTenantResponseDto> {
    try {
      const userTenantsFounded = await this.userTenantsRepository.findById(id);

      if (!userTenantsFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return userTenantsFounded;
    } catch (err) {
      throw err;
    }
  }
}
