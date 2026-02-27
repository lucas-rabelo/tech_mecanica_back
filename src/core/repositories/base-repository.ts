import { DeletedAndUpdatedDataResponseDto } from "@/src/infra";

export abstract class BaseRepository<CreateDto, ReadDto, UpdateDto, ListDto, FilterListDto> {
  abstract findById(id: number): Promise<ReadDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract create(data: CreateDto): Promise<ReadDto>;
  abstract update(id: number, data: UpdateDto): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(filters: FilterListDto): Promise<ListDto>;
}