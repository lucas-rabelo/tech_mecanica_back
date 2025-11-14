import { UserStatusEntity } from '@/src/infra';
import {
  CreateUserStatusRequestDto,
  ReadUserStatusResponseDto,
} from '@/src/modules/user-status/dtos';

export class UserStatusMapper {
  static toDatabase(data: CreateUserStatusRequestDto) {
    return {};
  }

  static toDomain(raw: UserStatusEntity): ReadUserStatusResponseDto {
    return {
      id: raw.id,
      name: raw.name,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt ? raw.updatedAt.toISOString() : null,
    };
  }
}
