import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadUserResponseDto } from '../../../dtos';
import { UsersRepository } from '../../../infra/http/database/users.repository';
import { IFindByIdUserUseCaseRequest } from './types';

@Injectable()
export class FindByIdUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    id,
    isAdmin,
    tenantId,
  }: IFindByIdUserUseCaseRequest): Promise<ReadUserResponseDto> {
    try {
      const userFounded = await this.usersRepository.findById({
        id,
        tenantId: isAdmin ? null : tenantId,
      });

      if (!userFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return userFounded;
    } catch (err) {
      throw err;
    }
  }
}
