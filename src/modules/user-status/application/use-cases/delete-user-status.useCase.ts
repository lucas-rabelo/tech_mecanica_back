import { UserStatusRepository } from '@/src/modules/user-status/infra';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FindUserStatusInUsersService } from '../services/find-user-status-in-users.service';
import { FindByIdUserStatusUseCase } from './find-by-id-user-status.useCase';

@Injectable()
export class DeleteUserStatusUseCase {
  constructor(
    private readonly userStatusRepository: UserStatusRepository,
    private readonly findUserStatusInUsersService: FindUserStatusInUsersService,
    private readonly findByIdUserStatusUseCase: FindByIdUserStatusUseCase,
  ) {}

  async execute(id: number) {
    const userStatusInUse = await this.findUserStatusInUsersService.execute(id);

    if (userStatusInUse) {
      throw new ConflictException('User status in use, cannot be deleted');
    }

    await this.findByIdUserStatusUseCase.execute(id);

    const userStatusFounded = await this.userStatusRepository.delete(id);

    if(!userStatusFounded) {
      throw new NotFoundException('User status not found');
    }

    return userStatusFounded;
  }
}
