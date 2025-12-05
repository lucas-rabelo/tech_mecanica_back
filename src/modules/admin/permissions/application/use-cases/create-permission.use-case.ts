import { Injectable } from '@nestjs/common';
import {
  CreatePermissionRequestDto,
  ReadPermissionResponseDto,
} from '../../dtos';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class CreatePermissionUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(
    request: CreatePermissionRequestDto,
  ): Promise<ReadPermissionResponseDto> {
    return this.permissionsRepository.create(request);
  }
}
