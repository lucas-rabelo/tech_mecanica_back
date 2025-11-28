import { Injectable } from '@nestjs/common';
import { ResetPasswordAuthRequestDto } from '../../dtos';
import { UsersRepository } from '@/src/modules/admin/users';

@Injectable()
export class ResetPasswordAuthUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(id: number, request: ResetPasswordAuthRequestDto) {
    return this.usersRepository.update(id, request);
  }
}