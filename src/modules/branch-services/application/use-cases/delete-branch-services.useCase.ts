import { Inject, Injectable } from "@nestjs/common";
import { BranchServicesRepository } from "../../infra/http";

@Injectable()
export class DeleteBranchServicesUseCase {
  constructor(
    @Inject('BranchServicesRepository')
    private readonly branchServicesRepository: BranchServicesRepository,
  ) {}


  async execute(id: number) {
    return this.branchServicesRepository.delete(id);
  }
}