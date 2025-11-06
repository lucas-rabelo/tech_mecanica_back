import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionModulesRequestDto } from '../../dto';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class UpdatePermissionModuleUseCase {
  constructor(
    @Inject('PermissionModulesRepository')
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(id: number, request: CreatePermissionModulesRequestDto) {
    return this.permissionModulesRepository.update(id, request);
  }
}
