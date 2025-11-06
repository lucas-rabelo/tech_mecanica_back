import {
  CreateModuleRequestDto,
  ListModuleRequestDto,
  ListModuleResponseDto,
  ReadModuleResponseDto,
} from '../../../dto';

export abstract class ModuleRepository {
  abstract create(data: CreateModuleRequestDto): Promise<ReadModuleResponseDto>;
  abstract update(
    id: number,
    data: CreateModuleRequestDto,
  ): Promise<ReadModuleResponseDto>;
  abstract findById(id: number): Promise<ReadModuleResponseDto | null>;
  abstract delete(id: number): Promise<ReadModuleResponseDto>;
  abstract list(filters: ListModuleRequestDto): Promise<ListModuleResponseDto>;
}
