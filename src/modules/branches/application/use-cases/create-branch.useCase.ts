import { Injectable } from '@nestjs/common';
import { CreateBranchRequestDto, ReadBranchResponseDto } from '../../dto';
import { BranchesRepository } from '../../infra';
import { FormattedAddressBranchService } from '../services';

@Injectable()
export class CreateBranchUseCase {
  constructor(
    private readonly branchesRepository: BranchesRepository,
    private readonly formattedAddressBranchService: FormattedAddressBranchService,
  ) {}

  async execute(
    request: CreateBranchRequestDto,
  ): Promise<ReadBranchResponseDto> {
    const branchCreated = await this.branchesRepository.create(request);

    const address = this.formattedAddressBranchService.execute(branchCreated);

    return {
      ...branchCreated,
      address,
    };
  }
}
