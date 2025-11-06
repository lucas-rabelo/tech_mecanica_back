import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../../infra';

@Injectable()
export class FindByIdUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: number) {
    const userFounded = await this.usersRepository.findById(id);

    if(!userFounded) {
      throw new NotFoundException('User not found');
    }

    return userFounded;
  }
}
