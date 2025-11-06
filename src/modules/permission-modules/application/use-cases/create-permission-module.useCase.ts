import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionModulesRequestDto } from '../../dto';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class CreatePermissionModuleUseCase {
  constructor(
    @Inject('PermissionModulesRepository')
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(request: CreatePermissionModulesRequestDto) {
    return this.permissionModulesRepository.create(request);
  }
}
