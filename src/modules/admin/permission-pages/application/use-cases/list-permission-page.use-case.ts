import { Injectable } from '@nestjs/common';
import {
  FilterListPermissionPageRequestDto,
  ListPermissionPagesResponseDto,
} from '../../dtos';
import { PermissionPagesRepository } from '../../infra';

@Injectable()
export class ListPermissionPageUseCase {
  constructor(
    private readonly permissionPagesRepository: PermissionPagesRepository,
  ) {}

  async execute(
    request: FilterListPermissionPageRequestDto,
  ): Promise<ListPermissionPagesResponseDto> {
    try {
      const permissionPagesFounded =
        await this.permissionPagesRepository.list(request);

      return permissionPagesFounded;
    } catch (err) {
      throw err;
    }
  }
}
