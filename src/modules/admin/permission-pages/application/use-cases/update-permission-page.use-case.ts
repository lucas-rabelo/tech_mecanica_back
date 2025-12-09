import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionPageRequestDto } from '../../dtos';
import { PermissionPagesRepository } from '../../infra';
import { FindByIdPermissionPageUseCase } from './find-by-id-permission-page.use-case';

@Injectable()
export class UpdatePermissionPageUseCase {
  constructor(
    private readonly permissionPagesRepository: PermissionPagesRepository,
    private readonly findByIdPermissionPageUseCase: FindByIdPermissionPageUseCase,
  ) {}

  async execute(
    id: number,
    request: CreatePermissionPageRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdPermissionPageUseCase.execute(id);

      const permissionPageUpdated =
        await this.permissionPagesRepository.update(id, request);

      if (!permissionPageUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return permissionPageUpdated;
    } catch (err) {
      throw err;
    }
  }
}
