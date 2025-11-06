import { Inject, Injectable } from '@nestjs/common';
import { ListPermissionPagesRequestDto } from '../../dto';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class ListPermissionPageUseCase {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly PermissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(filters: ListPermissionPagesRequestDto) {
    return this.PermissionPagesRepository.list(filters);
  }
}
