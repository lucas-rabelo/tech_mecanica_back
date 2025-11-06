import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../../dto';
import { UsersRepository } from '../../infra';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: number, request: CreateUserRequestDto) {
    return this.usersRepository.update(id, request);
  }
}
