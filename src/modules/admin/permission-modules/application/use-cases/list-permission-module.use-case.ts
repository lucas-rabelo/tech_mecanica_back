import { Injectable } from '@nestjs/common';
import {
  FilterListPermissionModuleRequestDto,
  ListPermissionModulesResponseDto,
} from '../../dtos';
import { PermissionModulesRepository } from '../../infra';

@Injectable()
export class ListPermissionModuleUseCase {
  constructor(
    private readonly permissionModulesRepository: PermissionModulesRepository,
  ) {}

  async execute(
    request: FilterListPermissionModuleRequestDto,
  ): Promise<ListPermissionModulesResponseDto> {
    try {
      const permissionModulesFounded =
        await this.permissionModulesRepository.list(request);

      return permissionModulesFounded;
    } catch (err) {
      throw err;
    }
  }
}
