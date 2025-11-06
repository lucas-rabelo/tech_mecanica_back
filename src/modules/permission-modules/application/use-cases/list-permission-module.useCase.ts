import { Inject, Injectable } from '@nestjs/common';
import { ListPermissionModulesRequestDto } from '../../dto';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class ListPermissionModuleUseCase {
  constructor(
    @Inject('PermissionModulesRepository')
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(filters: ListPermissionModulesRequestDto) {
    return this.permissionModulesRepository.list(filters);
  }
}
