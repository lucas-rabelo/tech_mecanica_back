import { Injectable } from '@nestjs/common';
import type { CreateVehicleRequestDto } from '../../dtos';
import { VehiclesRepository } from '../../infra';

@Injectable()
export class CreateVehicleUseCase {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute(data: CreateVehicleRequestDto) {
    return this.vehiclesRepository.create(data);
  }
}
