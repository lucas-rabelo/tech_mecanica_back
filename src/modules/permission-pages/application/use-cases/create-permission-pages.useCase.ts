import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionPagesRequestDto } from '../../dto';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class CreatePermissionPageUseCase {
  constructor(
    @Inject('PermissionPagesRepository')
    private readonly PermissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(request: CreatePermissionPagesRequestDto) {
    return this.PermissionPagesRepository.create(request);
  }
}
