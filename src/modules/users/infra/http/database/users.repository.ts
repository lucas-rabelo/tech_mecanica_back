import { CreateUserRequestDto, ReadUserResponseDto, ListUserRequestDto, ListUserResponseDto } from '../../../dto';

export abstract class UsersRepository {
  abstract findByUserStatusId(
    id: number,
  ): Promise<ReadUserResponseDto | null>;
  abstract create(data: CreateUserRequestDto): Promise<ReadUserResponseDto>;
  abstract update(
    id: number,
    data: CreateUserRequestDto,
  ): Promise<ReadUserResponseDto>;
  abstract delete(id: number): Promise<ReadUserResponseDto | null>;
  abstract findById(id: number): Promise<ReadUserResponseDto | null>;
  abstract list(filters: ListUserRequestDto): Promise<ListUserResponseDto>;
}
