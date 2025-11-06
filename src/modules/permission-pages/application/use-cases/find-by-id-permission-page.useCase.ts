import { Inject, Injectable } from '@nestjs/common';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class FindByIdPermissionPagesUseCase {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly PermissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(id: number) {
    return this.PermissionPagesRepository.findById(id);
  }
}
