import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadPermissionPageResponseDto } from '../../dtos';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class FindByIdPermissionPageUseCase {
  constructor(
    private readonly permissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(id: number): Promise<ReadPermissionPageResponseDto> {
    try {
      const permissionPageFounded =
        await this.permissionPagesRepository.findById(id);

      if (!permissionPageFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return permissionPageFounded;
    } catch (err) {
      throw err;
    }
  }
}
