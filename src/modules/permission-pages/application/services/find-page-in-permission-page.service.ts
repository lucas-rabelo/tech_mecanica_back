import { Inject, Injectable } from '@nestjs/common';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class FindPageInPermissionPagesService {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly permissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(moduleId: number) {
    const pageFounded =
      await this.permissionPagesRepository.findByPageId(moduleId);

    return Boolean(pageFounded);
  }
}
