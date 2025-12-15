import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadVehicleResponseDto } from '../../dtos';
import { VehiclesRepository } from '../../infra';

@Injectable()
export class FindByIdVehicleUseCase {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute(id: number): Promise<ReadVehicleResponseDto> {
    try {
      const vehicleFounded = await this.vehiclesRepository.findById(id);

      if (!vehicleFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return vehicleFounded;
    } catch (err) {
      throw err;
    }
  }
}
