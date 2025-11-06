import { Inject, Injectable } from '@nestjs/common';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class FindByIdPermissionModulesUseCase {
  constructor(
    @Inject('PermissionModulesRepository')
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(id: number) {
    return this.permissionModulesRepository.findById(id);
  }
}
