import { Injectable } from '@nestjs/common';
import {
  CreatePermissionPageRequestDto,
  ReadPermissionPageResponseDto,
} from '../../dtos';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class CreatePermissionPageUseCase {
  constructor(private readonly permissionPagesRepository: PermissionPagesRepository) {}

  async execute(
    request: CreatePermissionPageRequestDto,
  ): Promise<ReadPermissionPageResponseDto> {
    return this.permissionPagesRepository.create(request);
  }
}
