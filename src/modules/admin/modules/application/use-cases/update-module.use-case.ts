import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateModuleRequestDto } from '../../dtos';
import { ModulesRepository } from '../../infra';
import { FindByIdModuleUseCase } from './find-by-id-module.use-case';

@Injectable()
export class UpdateModuleUseCase {
  constructor(
    private readonly modulesRepository: ModulesRepository,
    private readonly findByIdPermissionUseCase: FindByIdModuleUseCase,
  ) {}

  async execute(
    id: number,
    request: CreateModuleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdPermissionUseCase.execute(id);

      const moduleUpdated = await this.modulesRepository.update(
        id,
        request,
      );

      if (!moduleUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return moduleUpdated;
    } catch (err) {
      throw err;
    }
  }
}
