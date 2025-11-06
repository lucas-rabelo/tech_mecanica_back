import { Inject, Injectable } from '@nestjs/common';
import { BranchContactsRepository } from '../../infra/http';

@Injectable()
export class FindBranchInBranchContact {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}


  async execute(branchId: number) {
    const serviceFounded = await this.branchContactsRepository.findByBranchId(branchId);

    return Boolean(serviceFounded);
  }
}
