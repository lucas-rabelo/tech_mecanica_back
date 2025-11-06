import { Inject, Injectable } from '@nestjs/common';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class DeletePermissionPageUseCase {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly PermissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(id: number) {
    return this.PermissionPagesRepository.delete(id);
  }
}
