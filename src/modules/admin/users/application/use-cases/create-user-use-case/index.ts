import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto, ReadUserResponseDto } from '../../../dtos';
import { UsersRepository } from '../../../infra';
import { ICreateUserUseCaseRequest } from './types';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ isAdmin, tenantId, request }: ICreateUserUseCaseRequest): Promise<ReadUserResponseDto> {
    const { password, confirmPassword } = request;

    if (password !== confirmPassword) {
      throw new ApplicationException(
        DEFAULT_MESSAGES.ERROR_CREATE + ' - Passwords do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordEncrypted = await bcrypt.hash(
      password,
      await bcrypt.genSalt(),
    );

    let userRequest: CreateUserRequestDto = request;

    if (!isAdmin) {
      userRequest = { ...request, tenantId };
    }

    userRequest = { ...userRequest, password: passwordEncrypted };

    return this.usersRepository.create(userRequest);
  }
}
