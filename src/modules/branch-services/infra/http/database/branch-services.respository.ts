import {
  CreateBranchServiceRequestDto,
  ListBranchServiceRequestDto,
  ListBranchServiceResponseDto,
  ReadBranchServiceResponseDto,
} from '../../../dto';

export abstract class BranchServicesRepository {
  abstract findById(id: number): Promise<ReadBranchServiceResponseDto | null>;
  abstract findByServiceId(
    serviceId: number,
  ): Promise<ReadBranchServiceResponseDto | null>;
  abstract findByBranchId(
    BranchId: number,
  ): Promise<ReadBranchServiceResponseDto | null>;
  abstract create(
    data: CreateBranchServiceRequestDto,
  ): Promise<ReadBranchServiceResponseDto>;
  abstract update(
    id: number,
    data: CreateBranchServiceRequestDto,
  ): Promise<ReadBranchServiceResponseDto | null>;
  abstract delete(id: number): Promise<ReadBranchServiceResponseDto | null>;
  abstract list(
    filters: ListBranchServiceRequestDto,
  ): Promise<ListBranchServiceResponseDto>;
}
