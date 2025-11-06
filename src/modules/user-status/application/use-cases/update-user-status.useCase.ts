import { UserStatusRepository } from '@/src/modules/user-status/infra';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserStatusRequestDto } from '../../dto';

@Injectable()
export class UpdateUserStatusUseCase {
  constructor(
    private readonly userStatusRepository: UserStatusRepository
  ) {}

  async execute(id: number, request: UpdateUserStatusRequestDto) {
    const userStatusUpdated = await this.userStatusRepository.update(id, request);

    if (!userStatusUpdated) {
      throw new NotFoundException('User Status not found');
    }

    return userStatusUpdated;
  }
}
