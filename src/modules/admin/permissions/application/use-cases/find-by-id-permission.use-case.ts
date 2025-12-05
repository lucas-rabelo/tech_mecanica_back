import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadPermissionResponseDto } from '../../dtos';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class FindByIdPermissionUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(id: number): Promise<ReadPermissionResponseDto> {
    try {
      const permissionFounded = await this.permissionsRepository.findById(id);

      if (!permissionFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return permissionFounded;
    } catch (err) {
      throw err;
    }
  }
}
