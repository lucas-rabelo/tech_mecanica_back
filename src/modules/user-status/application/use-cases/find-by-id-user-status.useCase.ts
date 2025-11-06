import { UserStatusRepository } from '@/src/modules/user-status/infra';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class FindByIdUserStatusUseCase {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  async execute(id: number) {
    const userStatusFounded = await this.userStatusRepository.findById(id);

    if(!userStatusFounded) {
      throw new NotFoundException('User status not found');
    }

    return userStatusFounded;
  }
}
