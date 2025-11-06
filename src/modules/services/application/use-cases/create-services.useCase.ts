import { Injectable } from "@nestjs/common";
import { ServicesRepository } from "../../infra/http";
import { CreateServiceRequestDto } from "../../dto";

@Injectable()
export class CreateServicesUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(request: CreateServiceRequestDto) {
    return this.servicesRepository.create(request);
  }
}