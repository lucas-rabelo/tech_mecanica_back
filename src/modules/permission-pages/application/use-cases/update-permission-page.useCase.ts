import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionPagesRequestDto } from '../../dto';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class UpdatePermissionPageUseCase {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly PermissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(id: number, request: CreatePermissionPagesRequestDto) {
    return this.PermissionPagesRepository.update(id, request);
  }
}
