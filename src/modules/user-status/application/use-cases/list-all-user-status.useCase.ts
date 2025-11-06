import { UserStatusRepository } from '@/src/modules/user-status/infra';
import { Injectable } from '@nestjs/common';
import { ListUserStatusRequestDto } from '../../dto';

@Injectable()
export class ListAllUserStatusUseCase {
  constructor(
    private readonly userStatusRepository: UserStatusRepository,
  ) {}

  async execute(filters: ListUserStatusRequestDto) {
    return await this.userStatusRepository.findAll(filters);
  }
}
