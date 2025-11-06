import { Injectable } from '@nestjs/common';
import { PermissionsRepository } from '../../infra';

@Injectable()
export class DeletePermissionsUseCase {
  constructor(private readonly permissionsRepository: PermissionsRepository) {}

  async execute(id: number) {
    return this.permissionsRepository.delete(id);
  }
}
