import { BadRequestException, Injectable } from "@nestjs/common";
import { BranchesRepository } from "../../infra";
import { CreateBranchResponseDto } from "../../dto";
import { FindBranchInBranchService } from "@/src/modules/branch-services";

@Injectable()
export class DeleteBranchUseCase {
  constructor(
    private readonly branchesRepository: BranchesRepository,
    private readonly findBranchInBranchService: FindBranchInBranchService,
  ) {}

  async execute(id: number): Promise<CreateBranchResponseDto> {
    const branchInUse = await this.findBranchInBranchService.execute(id);

    if(branchInUse) {
      throw new BadRequestException('The branch cannot be deleted because it is in use.');
    }

    const branchDeleted = await this.branchesRepository.delete(id);

    if(!branchDeleted) {
      throw new BadRequestException('Branch not deleted');
    }

    return branchDeleted;
  }
}