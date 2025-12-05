import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class DeletePermissionUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const permissionDeleted = await this.permissionsRepository.delete(id);

      if (!permissionDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return permissionDeleted;
    } catch (err) {
      throw err;
    }
  }
}
