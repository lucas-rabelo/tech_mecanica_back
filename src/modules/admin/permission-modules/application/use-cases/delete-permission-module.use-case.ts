import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class DeletePermissionModuleUseCase {
  constructor(
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const permissionModuleDeleted =
        await this.permissionModulesRepository.delete(id);

      if (!permissionModuleDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return permissionModuleDeleted;
    } catch (err) {
      throw err;
    }
  }
}
