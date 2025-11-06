import { Inject, Injectable } from "@nestjs/common";
import { BranchServicesRepository } from "../../infra/http";
import { ListBranchServiceRequestDto } from "../../dto";

@Injectable()
export class ListBranchServicesUseCase {
  constructor(
    @Inject('BranchServicesRepository')
    private readonly branchServicesRepository: BranchServicesRepository,
  ) {}


  async execute(filters: ListBranchServiceRequestDto) {
    return this.branchServicesRepository.list(filters);
  }
}