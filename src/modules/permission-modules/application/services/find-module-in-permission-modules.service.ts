import { Inject, Injectable } from '@nestjs/common';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class FindModuleInPermissionModulesService {
  constructor(
    @Inject('PermissionModulesRepository')
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(moduleId: number) {
    const moduleFounded =
      await this.permissionModulesRepository.findByModuleId(moduleId);

    return Boolean(moduleFounded);
  }
}
