import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionRequestDto } from '../../dtos';
import { PermissionsRepository } from '../../infra';
import { FindByIdPermissionUseCase } from './find-by-id-permission.use-case';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    private readonly permissionsRepository: PermissionsRepository,
    private readonly findByIdPermissionUseCase: FindByIdPermissionUseCase,
  ) {}

  async execute(
    id: number,
    request: CreatePermissionRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdPermissionUseCase.execute(id);

      const permissionUpdated = await this.permissionsRepository.update(
        id,
        request,
      );

      if (!permissionUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return permissionUpdated;
    } catch (err) {
      throw err;
    }
  }
}
