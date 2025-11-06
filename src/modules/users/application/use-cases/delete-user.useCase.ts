import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../infra';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: number) {
    return this.usersRepository.delete(id);
  }
}
