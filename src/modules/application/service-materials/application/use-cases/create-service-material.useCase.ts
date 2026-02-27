import { Injectable } from '@nestjs/common';
import { CreateServiceMaterialRequestDto } from '../../dtos';
import { ServiceMaterialsRepository } from '../../infra';

@Injectable()
export class CreateServiceMaterialUseCase {
  constructor(private readonly serviceMaterialsRepository: ServiceMaterialsRepository) {}

  async execute(data: CreateServiceMaterialRequestDto) {
    return this.serviceMaterialsRepository.create(data);
  }
}
