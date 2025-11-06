import { Inject, Injectable } from '@nestjs/common';
import { CreateBranchServiceRequestDto } from '../../dto';
import { BranchServicesRepository } from '../../infra/http';

@Injectable()
export class CreateBranchServicesUseCase {
  constructor(
    @Inject('BranchServicesRepository')
    private readonly branchServicesRepository: BranchServicesRepository,
  ) {}

  async execute(request: CreateBranchServiceRequestDto) {
    return this.branchServicesRepository.create(request);
  }
}
