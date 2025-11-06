import { Injectable } from '@nestjs/common';
import {
  CreatePermissionPagesRequestDto,
  ListPermissionPagesRequestDto,
  ListPermissionPagesResponseDto,
  ReadPermissionPagesResponseDto,
} from '../../../dto';

@Injectable()
export abstract class PermissionPagesRepository {
  abstract create(
    data: CreatePermissionPagesRequestDto,
  ): Promise<ReadPermissionPagesResponseDto>;
  abstract update(
    id: number,
    data: CreatePermissionPagesRequestDto,
  ): Promise<ReadPermissionPagesResponseDto>;
  abstract findById(
    id: number,
  ): Promise<ReadPermissionPagesResponseDto | null>;
  abstract findByPageId(
    pageId: number,
  ): Promise<ReadPermissionPagesResponseDto | null>;
  abstract findByPermissionId(
    permissionId: number,
  ): Promise<ReadPermissionPagesResponseDto | null>;
  abstract delete(id: number): Promise<any>;
  abstract list(
    filters: ListPermissionPagesRequestDto,
  ): Promise<ListPermissionPagesResponseDto>;
}
