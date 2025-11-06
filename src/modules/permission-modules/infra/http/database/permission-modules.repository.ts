import { Injectable } from '@nestjs/common';
import {
  CreatePermissionModulesRequestDto,
  ListPermissionModulesRequestDto,
  ListPermissionModulesResponseDto,
  ReadPermissionModulesResponseDto,
} from '../../../dto';

@Injectable()
export abstract class PermissionModulesRepository {
  abstract create(
    data: CreatePermissionModulesRequestDto,
  ): Promise<ReadPermissionModulesResponseDto>;
  abstract update(
    id: number,
    data: CreatePermissionModulesRequestDto,
  ): Promise<ReadPermissionModulesResponseDto>;
  abstract findById(
    id: number,
  ): Promise<ReadPermissionModulesResponseDto | null>;
  abstract findByModuleId(
    moduleId: number,
  ): Promise<ReadPermissionModulesResponseDto | null>;
  abstract findByPermissionId(
    permissionId: number,
  ): Promise<ReadPermissionModulesResponseDto | null>;
  abstract delete(id: number): Promise<any>;
  abstract list(
    filters: ListPermissionModulesRequestDto,
  ): Promise<ListPermissionModulesResponseDto>;
}
