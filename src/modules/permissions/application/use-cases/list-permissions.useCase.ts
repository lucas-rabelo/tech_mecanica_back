import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from '../../infra';
import { ListPermissionRequestDto } from '../../dto';

@Injectable()
export class ListPermissionsUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(filters: ListPermissionRequestDto) {
    return this.permissionsRepository.list(filters);
  }
}
