import { UserStatusRepository } from '@/src/modules/user-status/infra';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserStatusUseCase {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  async execute(name: string) {
    const userStatusCreated = await this.userStatusRepository.create({ name });

    if (!userStatusCreated) {
      throw new ConflictException('User status already exists');
    }

    return userStatusCreated;
  }
}
