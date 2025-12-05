import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infra';
import { IDeleteUserUseCaseRequest } from './types';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ id, isAdmin, tenantId }: IDeleteUserUseCaseRequest): Promise<DeletedAndUpdatedDataResponseDto> {
    try {


      const userDeleted = await this.usersRepository.delete({
        id,
        tenantId: isAdmin ? undefined : tenantId,
      });

      if (!userDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return userDeleted;
    } catch (err) {
      throw err;
    }
  }
}
