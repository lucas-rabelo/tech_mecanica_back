import { Inject, Injectable } from '@nestjs/common';
import { BranchContactsRepository } from '../../infra/http';

@Injectable()
export class FindByIdBranchContactsUseCase {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}


  async execute(id: number) {
    return this.branchContactsRepository.findById(id);
  }
}
