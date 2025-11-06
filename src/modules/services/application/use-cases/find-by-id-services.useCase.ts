import { Injectable } from '@nestjs/common';
import { ServicesRepository } from '../../infra/http';

@Injectable()
export class FindByIdServicesUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: number) {
    return this.servicesRepository.findById(id);
  }
}
