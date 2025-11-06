import {
  CreateBranchRequestDto,
  CreateBranchResponseDto,
  ListBranchRequestDto
} from '../../../dto';

export abstract class BranchesRepository {
  abstract findById(id: number): Promise<CreateBranchResponseDto | null>;
  abstract create(
    data: CreateBranchRequestDto,
  ): Promise<CreateBranchResponseDto>;
  abstract update(
    id: number,
    data: CreateBranchRequestDto,
  ): Promise<CreateBranchResponseDto>;
  abstract delete(id: number): Promise<CreateBranchResponseDto>;
  abstract list(filters: ListBranchRequestDto): Promise<{ total: number, branches: CreateBranchResponseDto[] }>;
}
