import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRequestDto, ReadUserResponseDto } from '../../dtos';
import { UsersRepository } from '../../infra';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: CreateUserRequestDto): Promise<ReadUserResponseDto> {
    const { password, confirmPassword } = request;

    if (password !== confirmPassword) {
      throw new ApplicationException(
        DEFAULT_MESSAGES.ERROR_CREATE + ' - Passwords do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordEncrypted = await bcrypt.hash(password, await bcrypt.genSalt());

    const userRequest = { ...request, password: passwordEncrypted };

    return this.usersRepository.create(userRequest);
  }
}
