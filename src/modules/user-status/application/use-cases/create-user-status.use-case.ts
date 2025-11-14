import { Injectable } from '@nestjs/common';
import {
  CreateUserStatusRequestDto,
  ReadUserStatusResponseDto,
} from '../../dtos';
import { UserStatusRepository } from '../../infra';

@Injectable()
export class CreateUserStatusUseCase {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  async execute(
    request: CreateUserStatusRequestDto,
  ): Promise<ReadUserStatusResponseDto> {
    return this.userStatusRepository.create(request);
  }
}
