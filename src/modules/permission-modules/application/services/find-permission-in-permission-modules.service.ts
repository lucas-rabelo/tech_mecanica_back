import { Inject, Injectable } from '@nestjs/common';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class FindPermissionInPermissionModulesService {
  constructor(
    @Inject('PermissionModulesRepository')
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(permissionId: number) {
    const permissionFounded =
      await this.permissionModulesRepository.findByPermissionId(permissionId);

    return Boolean(permissionFounded);
  }
}
