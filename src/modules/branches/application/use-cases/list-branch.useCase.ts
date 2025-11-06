import { Injectable } from '@nestjs/common';
import { ListBranchRequestDto, ListBranchResponseDto } from '../../dto';
import { BranchesRepository } from '../../infra';
import { FormattedAddressBranchService } from '../services';

@Injectable()
export class ListBranchUseCase {
  constructor(
    private readonly branchesRepository: BranchesRepository,
    private readonly formattedAddressBranchService: FormattedAddressBranchService,
  ) {}

  async execute(
    filters: ListBranchRequestDto,
  ): Promise<ListBranchResponseDto> {
    const { branches, total } = await this.branchesRepository.list(filters);

    const branchesUpdated = branches.map(branch => {
      const address = this.formattedAddressBranchService.execute(branch);

      return {
        ...branch,
        address,
      };
    })

    return {
      total,
      branches: branchesUpdated
    }
  }
}
