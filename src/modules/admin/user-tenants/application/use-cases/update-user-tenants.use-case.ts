import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserTenantRequestDto } from '../../dtos';
import { UserTenantsRepository } from '../../infra';
import { FindByIdUserTenantsUseCase } from './find-by-id-user-tenants.use-case';

@Injectable()
export class UpdateUserTenantsUseCase {
  constructor(
    private readonly userTenantsRepository: UserTenantsRepository,
    private readonly findByIdUserTenantsUseCase: FindByIdUserTenantsUseCase,
  ) {}

  async execute(
    id: number,
    request: CreateUserTenantRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdUserTenantsUseCase.execute(id);

      const userTenantUpdated = await this.userTenantsRepository.update(
        id,
        request,
      );

      if (!userTenantUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      };

      return userTenantUpdated;
    } catch (err) {
      throw err;
    }
  }
}
