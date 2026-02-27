import { BadRequestUpdateException, BaseUseCase } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { Injectable } from '@nestjs/common';
import { CreateModuleUseCaseDto } from '../../dtos';
import { ModulesRepository } from '../../infra';

@Injectable()
export class UpdateModuleUseCase extends BaseUseCase<
  CreateModuleUseCaseDto,
  DeletedAndUpdatedDataResponseDto,
  ModulesRepository
> {
  constructor(protected readonly repository: ModulesRepository) {
    super(repository);
  }

  async execute({ id, data }: CreateModuleUseCaseDto): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const moduleUpdated = await this.repository.update(
        id,
        data,
      );

      if (!moduleUpdated) {
        throw new BadRequestUpdateException();
      }

      return moduleUpdated;
    } catch (err) {
      throw err;
    }
  }
}
