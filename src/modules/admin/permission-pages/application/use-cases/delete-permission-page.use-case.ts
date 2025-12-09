import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class DeletePermissionPageUseCase {
  constructor(
    private readonly permissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const permissionPageDeleted =
        await this.permissionPagesRepository.delete(id);

      if (!permissionPageDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return permissionPageDeleted;
    } catch (err) {
      throw err;
    }
  }
}
