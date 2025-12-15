import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateVehicleRequestDto } from '../../dtos';
import { VehiclesRepository } from '../../infra';
import { FindByIdVehicleUseCase } from './find-by-id-vehicle.use-case';

@Injectable()
export class UpdateVehicleUseCase {
  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly findByIdVehicleUseCase: FindByIdVehicleUseCase,
  ) {}

  async execute(
    id: number,
    request: UpdateVehicleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdVehicleUseCase.execute(id);

      const vehicleUpdated = await this.vehiclesRepository.update(
        id,
        request,
      );

      if (!vehicleUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return vehicleUpdated;
    } catch (err) {
      throw err;
    }
  }
}
