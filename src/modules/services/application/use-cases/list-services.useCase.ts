import { Injectable } from "@nestjs/common";
import { ServicesRepository } from "../../infra/http";
import { ListServicesRequestDto } from "../../dto";

@Injectable()
export class ListServicesUseCase {
  constructor(private readonly servicesRepository: ServicesRepository) {}

  async execute(filters: ListServicesRequestDto) {
    return this.servicesRepository.list(filters);
  }
}