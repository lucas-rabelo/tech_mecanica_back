import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { FindUserAuthResponseDto } from '@/src/modules/admin/auth';
import {
  CreateUserRequestDto,
  DeleteUserRequestDto,
  FilterListUserRequestDto,
  FindByIdUserRequestDto,
  ListUserResponseDto,
  ReadUserResponseDto,
  UpdateUserRequestDto,
} from '../../../dtos';

export abstract class UsersRepository {
  abstract findById(
    data: FindByIdUserRequestDto,
  ): Promise<ReadUserResponseDto | null>;
  abstract findByEmail(email: string): Promise<FindUserAuthResponseDto | null>;
  abstract findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FindUserAuthResponseDto | null>;
  abstract create(data: CreateUserRequestDto): Promise<ReadUserResponseDto>;
  abstract update(
    id: number,
    data: UpdateUserRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract delete(
    data: DeleteUserRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto>;
  abstract list(
    filters: FilterListUserRequestDto,
  ): Promise<ListUserResponseDto>;
}
