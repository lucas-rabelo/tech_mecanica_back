import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBranchRequestDto, ReadBranchResponseDto } from '../../dto';
import { BranchesRepository } from '../../infra';
import { FormattedAddressBranchService } from '../services';

@Injectable()
export class UpdateBranchUseCase {
  constructor(
    private readonly branchesRepository: BranchesRepository,
    private readonly formattedAddressBranchService: FormattedAddressBranchService
  ) {}

  async execute(
    id: number,
    request: CreateBranchRequestDto,
  ): Promise<ReadBranchResponseDto> {
    const branchUpdated = await this.branchesRepository.update(id, request);

    if (!branchUpdated) {
      throw new BadRequestException('Branch not updated');
    }

    const address = this.formattedAddressBranchService.execute(branchUpdated);

    return {
      ...branchUpdated,
      address,
    };
  }
}
