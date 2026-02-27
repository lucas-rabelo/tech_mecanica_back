import { BaseUseCase, DeleteException } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { Injectable } from '@nestjs/common';
import { ModulesRepository } from '../../infra';

@Injectable()
export class DeleteModuleUseCase extends BaseUseCase<
  number,
  DeletedAndUpdatedDataResponseDto,
  ModulesRepository
> {
  constructor(protected readonly repository: ModulesRepository) {
    super(repository);
  }

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const moduleDeleted = await this.repository.delete(id);

      if (!moduleDeleted) {
        throw new DeleteException();
      }

      return moduleDeleted;
    } catch (err) {
      throw err;
    }
  }
}
