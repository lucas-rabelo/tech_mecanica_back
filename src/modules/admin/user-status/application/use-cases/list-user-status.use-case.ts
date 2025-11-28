import { Injectable } from '@nestjs/common';
import {
  FilterListUserStatusRequestDto,
  ListUserStatusResponseDto,
} from '../../dtos';
import { UserStatusRepository } from '../../infra';

@Injectable()
export class ListUserStatusUseCase {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  async execute(
    request: FilterListUserStatusRequestDto,
  ): Promise<ListUserStatusResponseDto> {
    try {
      const userStatusFounded = await this.userStatusRepository.list(request);

      return userStatusFounded;
    } catch (err) {
      throw err;
    }
  }
}
