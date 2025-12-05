import { DeletedAndUpdatedDataResponseDto } from '@/src/infra/docs';
import {
  CreateModuleRequestDto,
  FilterListModuleRequestDto,
  ListModulesResponseDto,
  ReadModuleResponseDto,
} from '../../../dtos';

export abstract class ModulesRepository {
  abstract create(
    data: CreateModuleRequestDto,
  ): Promise<ReadModuleResponseDto>;
  abstract findById(id: number): Promise<ReadModuleResponseDto | null>;
  abstract update(
    id: number,
    data: CreateModuleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListModuleRequestDto,
  ): Promise<ListModulesResponseDto>;
}
