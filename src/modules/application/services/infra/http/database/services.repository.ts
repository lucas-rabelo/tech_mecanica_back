import type { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import type {
  CreateServiceRequestDto,
  FilterListServicesRequestDto,
  ListServicesResponseDto,
  ReadServiceResponseDto,
  UpdateServiceRequestDto,
} from '../../../dtos';

export abstract class ServicesRepository {
  abstract create(
    data: CreateServiceRequestDto,
  ): Promise<ReadServiceResponseDto>;
  abstract findById(id: number): Promise<ReadServiceResponseDto | null>;
  abstract update(
    id: number,
    data: UpdateServiceRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListServicesRequestDto,
  ): Promise<ListServicesResponseDto>;
}
