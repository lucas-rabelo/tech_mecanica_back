import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadTenantsResponseDto } from '../../dtos';
import { TenantsRepository } from '../../infra';

@Injectable()
export class FindByIdTenantUseCase {
  constructor(private readonly tenantsRepository: TenantsRepository) {}

  async execute(id: number): Promise<ReadTenantsResponseDto> {
    try {
      const tenantFounded = await this.tenantsRepository.findById(id);

      if (!tenantFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return tenantFounded;
    } catch (err) {
      throw err;
    }
  }
}
