import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateTenantsRequestDto,
  FiltersListTenantsRequestDto,
  ListTenantsResponseDto,
  ReadTenantsResponseDto,
} from '../../../dtos';

export abstract class TenantsRepository {
  abstract create(
    data: CreateTenantsRequestDto,
  ): Promise<ReadTenantsResponseDto>;
  abstract update(
    id: number,
    data: CreateTenantsRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract findById(id: number): Promise<ReadTenantsResponseDto>;
  abstract list(
    filters: FiltersListTenantsRequestDto,
  ): Promise<ListTenantsResponseDto>;
}
