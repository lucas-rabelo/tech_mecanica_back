import { Injectable } from '@nestjs/common';
import {
  FilterListVehiclesRequestDto,
  ListVehiclesResponseDto,
} from '../../dtos';
import { VehiclesRepository } from '../../infra';

@Injectable()
export class ListVehicleUseCase {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute(
    request: FilterListVehiclesRequestDto,
  ): Promise<ListVehiclesResponseDto> {
    try {
      const vehiclesFounded = await this.vehiclesRepository.list(request);

      return vehiclesFounded;
    } catch (err) {
      throw err;
    }
  }
}
