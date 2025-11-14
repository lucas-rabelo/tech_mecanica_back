import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import {
  CreateUserStatusRequestDto,
  FilterListUserStatusRequestDto,
  ListUserStatusResponseDto,
  ReadUserStatusResponseDto,
} from '../../../dtos';

export abstract class UserStatusRepository {
  abstract create(
    data: CreateUserStatusRequestDto,
  ): Promise<ReadUserStatusResponseDto>;
  abstract findById(id: number): Promise<ReadUserStatusResponseDto | null>;
  abstract update(
    id: number,
    data: CreateUserStatusRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null>;
  abstract list(
    filters: FilterListUserStatusRequestDto,
  ): Promise<ListUserStatusResponseDto | null>;
}
