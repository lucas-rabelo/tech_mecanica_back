import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infra';
import { ListUserRequestDto } from '../../dto';

@Injectable()
export class ListUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(filters: ListUserRequestDto) {
    return this.usersRepository.list(filters);
  }
}
