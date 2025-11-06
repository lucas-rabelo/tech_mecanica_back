import { Inject, Injectable } from "@nestjs/common";
import { BranchServicesRepository } from "../../infra/http";
import { CreateBranchServiceRequestDto } from "../../dto";

@Injectable()
export class UpdateBranchServicesUseCase {
  constructor(
    @Inject('BranchServicesRepository')
    private readonly branchServicesRepository: BranchServicesRepository,
  ) {}


  async execute(id: number, request: CreateBranchServiceRequestDto) {
    return this.branchServicesRepository.update(id, request);
  }
}