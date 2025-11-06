import { Inject, Injectable } from '@nestjs/common';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class FindPermissionInPermissionPagesService {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly permissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(pageId: number) {
    const permissionFounded =
      await this.permissionPagesRepository.findByPermissionId(pageId);

    Boolean(permissionFounded);
  }
}
