import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateUserRequestDto,
  FilterListUserRequestDto,
  ListUserResponseDto,
  ReadUserResponseDto,
} from '../../../dtos';

export abstract class UsersRepository {
  abstract findById(id: number): Promise<ReadUserResponseDto | null>;
  abstract create(data: CreateUserRequestDto): Promise<ReadUserResponseDto>;
  abstract update(
    id: number,
    data: CreateUserRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract list(
    filters: FilterListUserRequestDto,
  ): Promise<ListUserResponseDto>;
}
