import { Inject, Injectable } from '@nestjs/common';
import { BranchServicesRepository } from '../../infra/http';

@Injectable()
export class FindBranchInBranchService {
  constructor(
    @Inject('BranchServicesRepository')
    private readonly branchServicesRepository: BranchServicesRepository,
  ) {}


  async execute(branchId: number) {
    const serviceFounded = await this.branchServicesRepository.findByBranchId(branchId);

    return Boolean(serviceFounded);
  }
}
