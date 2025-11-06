import { Inject, Injectable } from "@nestjs/common";
import { BranchContactsRepository } from "../../infra/http";
import { CreateBranchContactRequestDto } from "../../dto";

@Injectable()
export class UpdateBranchContactsUseCase {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}


  async execute(id: number, request: CreateBranchContactRequestDto) {
    return this.branchContactsRepository.update(id, request);
  }
}