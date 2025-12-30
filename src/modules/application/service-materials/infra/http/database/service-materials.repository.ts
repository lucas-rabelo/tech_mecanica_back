import type { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import type {
  CreateServiceMaterialRequestDto,
  FilterListServiceMaterialsRequestDto,
  ListServiceMaterialsResponseDto,
  ReadServiceMaterialResponseDto,
  UpdateServiceMaterialRequestDto,
} from '../../../dtos';

export abstract class ServiceMaterialsRepository {
  abstract create(
    data: CreateServiceMaterialRequestDto,
  ): Promise<ReadServiceMaterialResponseDto>;
  abstract findById(id: number): Promise<ReadServiceMaterialResponseDto | null>;
  abstract update(
    id: number,
    data: UpdateServiceMaterialRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListServiceMaterialsRequestDto,
  ): Promise<ListServiceMaterialsResponseDto>;
}
