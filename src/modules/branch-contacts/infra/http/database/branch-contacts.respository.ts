import {
  CreateBranchContactRequestDto,
  ListBranchContactRequestDto,
  ListBranchContactResponseDto,
  ReadBranchContactResponseDto,
} from '../../../dto';

export abstract class BranchContactsRepository {
  abstract findById(id: number): Promise<ReadBranchContactResponseDto | null>;
  abstract findByContactId(
    contactId: number,
  ): Promise<ReadBranchContactResponseDto | null>;
  abstract findByBranchId(
    BranchId: number,
  ): Promise<ReadBranchContactResponseDto | null>;
  abstract create(
    data: CreateBranchContactRequestDto,
  ): Promise<ReadBranchContactResponseDto>;
  abstract update(
    id: number,
    data: CreateBranchContactRequestDto,
  ): Promise<ReadBranchContactResponseDto | null>;
  abstract delete(id: number): Promise<ReadBranchContactResponseDto | null>;
  abstract list(
    filters: ListBranchContactRequestDto,
  ): Promise<ListBranchContactResponseDto>;
}
