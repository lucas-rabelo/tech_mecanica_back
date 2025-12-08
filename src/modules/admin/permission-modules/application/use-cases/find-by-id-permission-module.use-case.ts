import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadPermissionModuleResponseDto } from '../../dtos';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class FindByIdPermissionModuleUseCase {
  constructor(
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(id: number): Promise<ReadPermissionModuleResponseDto> {
    try {
      const permissionModuleFounded =
        await this.permissionModulesRepository.findById(id);

      if (!permissionModuleFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return permissionModuleFounded;
    } catch (err) {
      throw err;
    }
  }
}
