import { Inject, Injectable } from '@nestjs/common';
import { CreateBranchContactRequestDto } from '../../dto';
import { BranchContactsRepository } from '../../infra/http';

@Injectable()
export class CreateBranchContactsUseCase {
  constructor(
    @Inject('BranchContactsRepository')
    private readonly branchContactsRepository: BranchContactsRepository,
  ) {}

  async execute(request: CreateBranchContactRequestDto) {
    return this.branchContactsRepository.create(request);
  }
}
