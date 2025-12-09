import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionModuleRequestDto } from '../../dtos';
import { PermissionModulesRepository } from '../../infra';
import { FindByIdPermissionModuleUseCase } from './find-by-id-permission-module.use-case';

@Injectable()
export class UpdatePermissionModuleUseCase {
  constructor(
    private readonly permissionModulesRepository: PermissionModulesRepository,
    private readonly findByIdPermissionModuleUseCase: FindByIdPermissionModuleUseCase,
  ) {}

  async execute(
    id: number,
    request: CreatePermissionModuleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdPermissionModuleUseCase.execute(id);

      const permissionModuleUpdated =
        await this.permissionModulesRepository.update(id, request);

      if (!permissionModuleUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return permissionModuleUpdated;
    } catch (err) {
      throw err;
    }
  }
}
