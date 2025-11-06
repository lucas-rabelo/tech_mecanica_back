import { Inject, Injectable } from '@nestjs/common';
import { BranchServicesRepository } from '../../infra/http';

@Injectable()
export class FindServiceInBranchService {
  constructor(
    @Inject('BranchServicesRepository')
    private readonly branchServicesRepository: BranchServicesRepository,
  ) {}


  async execute(serviceId: number) {
    const serviceFounded = await this.branchServicesRepository.findByServiceId(serviceId);

    return Boolean(serviceFounded);
  }
}
