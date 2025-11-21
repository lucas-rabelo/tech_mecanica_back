import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantsRequestDto } from '../../dtos';
import { TenantsRepository } from '../../infra';
import { FindByIdTenantUseCase } from './find-by-id-tenant.use-case';

@Injectable()
export class UpdateTenantUseCase {
  constructor(
    private readonly tenantsRepository: TenantsRepository,
    private readonly findByIdTenantUseCase: FindByIdTenantUseCase,
  ) {}

  async execute(
    id: number,
    request: CreateTenantsRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdTenantUseCase.execute(id);

      const tenantUpdated = await this.tenantsRepository.update(
        id,
        request,
      );

      if (!tenantUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return tenantUpdated;
    } catch (err) {
      throw err;
    }
  }
}
