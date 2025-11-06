import { Injectable, NotFoundException } from '@nestjs/common';
import { ReadBranchResponseDto } from '../../dto';
import { BranchesRepository } from '../../infra';
import { FormattedAddressBranchService } from '../services';

@Injectable()
export class FindByIdBranchUseCase {
  constructor(
    private readonly branchesRepository: BranchesRepository,
    private readonly formattedAddressBranchService: FormattedAddressBranchService,
  ) {}

  async execute(id: number): Promise<ReadBranchResponseDto> {
    const branchCreated = await this.branchesRepository.findById(id);

    if (!branchCreated) {
      throw new NotFoundException('Branch not found');
    }

    const address = this.formattedAddressBranchService.execute(branchCreated);

    return {
      ...branchCreated,
      address,
    };
  }
}
