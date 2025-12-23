import { Injectable } from '@nestjs/common';
import {
  FilterListServicesRequestDto,
  ListServicesResponseDto,
} from '../../dtos';
import { ServicesRepository } from '../../infra';

@Injectable()
export class ListServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(
    request: FilterListServicesRequestDto,
  ): Promise<ListServicesResponseDto> {
    try {
      const servicesFounded = await this.servicesRepository.list(request);

      return servicesFounded;
    } catch (err) {
      throw err;
    }
  }
}
