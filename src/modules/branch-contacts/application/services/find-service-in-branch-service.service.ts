import { Inject, Injectable } from '@nestjs/common';
import { BranchContactsRepository } from '../../infra/http';

@Injectable()
export class FindServiceInBranchContact {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}


  async execute(serviceId: number) {
    const serviceFounded = await this.branchContactsRepository.findByServiceId(serviceId);

    return Boolean(serviceFounded);
  }
}
