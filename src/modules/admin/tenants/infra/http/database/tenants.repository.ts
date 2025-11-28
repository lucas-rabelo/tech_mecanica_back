import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateTenantsRequestDto,
  FiltersListTenantsRequestDto,
  ListTenantsResponseDto,
  ReadTenantsResponseDto,
  UpdateTenantsRequestDto,
} from '../../../dtos';

export abstract class TenantsRepository {
  abstract create(
    data: CreateTenantsRequestDto,
  ): Promise<ReadTenantsResponseDto | null>;
  abstract update(
    id: number,
    data: UpdateTenantsRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract findById(id: number): Promise<ReadTenantsResponseDto | null>;
  abstract findBySubdomain(
    subdomain: string,
  ): Promise<ReadTenantsResponseDto | null>;
  abstract list(
    filters: FiltersListTenantsRequestDto,
  ): Promise<ListTenantsResponseDto>;
}
