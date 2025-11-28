import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantStatusRequestDto } from '../../dtos';
import { TenantStatusRepository } from '../../infra';
import { FindByIdTenantStatusUseCase } from './find-by-id-tenant-status.use-case';

@Injectable()
export class UpdateTenantStatusUseCase {
  constructor(
    private readonly userSatusRepository: TenantStatusRepository,
    private readonly findByIdTenantStatusUseCase: FindByIdTenantStatusUseCase,
  ) {}

  async execute(
    id: number,
    request: CreateTenantStatusRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdTenantStatusUseCase.execute(id);

      const TenantStatusUpdated = await this.userSatusRepository.update(
        id,
        request,
      );

      if (!TenantStatusUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return TenantStatusUpdated;
    } catch (err) {
      throw err;
    }
  }
}
