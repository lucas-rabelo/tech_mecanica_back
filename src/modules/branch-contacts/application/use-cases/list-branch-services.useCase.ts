import { Inject, Injectable } from "@nestjs/common";
import { BranchContactsRepository } from "../../infra/http";
import { ListBranchContactRequestDto } from "../../dto";

@Injectable()
export class ListBranchContactsUseCase {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}


  async execute(filters: ListBranchContactRequestDto) {
    return this.branchContactsRepository.list(filters);
  }
}