import { Inject, Injectable } from "@nestjs/common";
import { BranchContactsRepository } from "../../infra/http";

@Injectable()
export class DeleteBranchContactsUseCase {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}


  async execute(id: number) {
    return this.branchContactsRepository.delete(id);
  }
}