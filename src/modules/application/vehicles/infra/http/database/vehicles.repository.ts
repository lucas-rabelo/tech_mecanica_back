import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateVehicleRequestDto,
  FilterListVehiclesRequestDto,
  ListVehiclesResponseDto,
  ReadVehicleResponseDto,
  UpdateVehicleRequestDto,
} from '../../../dtos';

export abstract class VehiclesRepository {
  abstract create(
    data: CreateVehicleRequestDto,
  ): Promise<ReadVehicleResponseDto>;
  abstract findById(id: number): Promise<ReadVehicleResponseDto | null>;
  abstract update(
    id: number,
    data: UpdateVehicleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListVehiclesRequestDto,
  ): Promise<ListVehiclesResponseDto>;
}
