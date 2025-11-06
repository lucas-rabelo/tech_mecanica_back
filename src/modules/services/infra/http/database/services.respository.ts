import {
  CreateServiceRequestDto,
  ListServicesRequestDto,
  ListServicesResponseDto,
  ReadServiceResponseDto,
} from '../../../dto';

export abstract class ServicesRepository {
  abstract findById(id: number): Promise<ReadServiceResponseDto | null>;
  abstract create(
    data: CreateServiceRequestDto,
  ): Promise<ReadServiceResponseDto>;
  abstract update(
    id: number,
    data: CreateServiceRequestDto,
  ): Promise<ReadServiceResponseDto>;
  abstract delete(id: number): Promise<ReadServiceResponseDto | null>;
  abstract list(
    filters: ListServicesRequestDto,
  ): Promise<ListServicesResponseDto>;
}
