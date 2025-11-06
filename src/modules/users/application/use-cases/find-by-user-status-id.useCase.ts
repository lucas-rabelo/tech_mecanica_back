import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infra/http/database';

@Injectable()
export class FindByUserStatusIdUseCase {
  constructor(
    private usersRepository: UsersRepository,
  ) {}

  async execute(id: number) {
    return this.usersRepository.findByUserStatusId(id);
  }
}
