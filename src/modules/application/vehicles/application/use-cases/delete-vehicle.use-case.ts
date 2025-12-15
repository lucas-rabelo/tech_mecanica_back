import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { VehiclesRepository } from '../../infra';

@Injectable()
export class DeleteVehicleUseCase {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const vehicleDeleted = await this.vehiclesRepository.delete(id);

      if (!vehicleDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return vehicleDeleted;
    } catch (err) {
      throw err;
    }
  }
}
