import { Injectable } from '@nestjs/common';
import {
  CreateUserStatusRequestDto,
  CreateUserStatusResponseDto,
  ListUserStatusRequestDto,
  UpdateUserStatusRequestDto,
} from '../../../dto';

@Injectable()
export abstract class UserStatusRepository {
  abstract create(
    data: CreateUserStatusRequestDto,
  ): Promise<CreateUserStatusResponseDto>;
  abstract update(
    id: number,
    data: UpdateUserStatusRequestDto,
  ): Promise<CreateUserStatusResponseDto>;
  abstract findById(id: number): Promise<CreateUserStatusResponseDto | null>;
  abstract delete(id: number): Promise<CreateUserStatusResponseDto | null>;
  abstract findAll(
    filters: ListUserStatusRequestDto,
  ): Promise<CreateUserStatusResponseDto[]>;
}
