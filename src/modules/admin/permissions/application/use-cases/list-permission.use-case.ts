import { Injectable } from '@nestjs/common';
import {
  FilterListPermisssionRequestDto,
  ListPermissionsResponseDto,
} from '../../dtos';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class ListPermissionUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(
    request: FilterListPermisssionRequestDto,
  ): Promise<ListPermissionsResponseDto> {
    try {
      const permissionsFounded = await this.permissionsRepository.list(request);

      return permissionsFounded;
    } catch (err) {
      throw err;
    }
  }
}
