import { Injectable } from '@nestjs/common';
import type { CreateServiceRequestDto } from '../../dtos';
import { ServicesRepository } from '../../infra';

@Injectable()
export class CreateServiceUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(data: CreateServiceRequestDto) {
    return this.servicesRepository.create(data);
  }
}
