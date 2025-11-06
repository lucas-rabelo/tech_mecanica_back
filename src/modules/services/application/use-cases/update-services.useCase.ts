import { Injectable } from "@nestjs/common";
import { ServicesRepository } from "../../infra/http";
import { CreateServiceRequestDto } from "../../dto";

@Injectable()
export class UpdateServicesUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(id: number, request: CreateServiceRequestDto) {
    return this.servicesRepository.update(id, request);
  }
}