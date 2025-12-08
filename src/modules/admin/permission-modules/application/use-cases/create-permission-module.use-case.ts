import { Injectable } from '@nestjs/common';
import {
  CreatePermissionModuleRequestDto,
  ReadPermissionModuleResponseDto,
} from '../../dtos';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class CreatePermissionModuleUseCase {
  constructor(private readonly permissionModulesRepository: PermissionModulesRepository) {}

  async execute(
    request: CreatePermissionModuleRequestDto,
  ): Promise<ReadPermissionModuleResponseDto> {
    return this.permissionModulesRepository.create(request);
  }
}
