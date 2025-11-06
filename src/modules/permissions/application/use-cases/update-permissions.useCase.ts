import { Injectable } from '@nestjs/common';
import { UpdatePermissionRequestDto } from '../../dto';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class UpdatePermissionsUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(id: number, request: UpdatePermissionRequestDto) {
    return this.permissionsRepository.update(id, request);
  }
}
