import { Injectable } from '@nestjs/common';
import { CreatePermissionRequestDto } from '../../dto';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class CreatePermissionsUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(request: CreatePermissionRequestDto) {
    return this.permissionsRepository.create(request);
  }
}
