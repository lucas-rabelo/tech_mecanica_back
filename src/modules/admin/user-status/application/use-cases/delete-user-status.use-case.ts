import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserStatusRepository } from '../../infra';

@Injectable()
export class DeleteUserStatusUseCase {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const userStatusDeleted = await this.userStatusRepository.delete(id);

      if (!userStatusDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return userStatusDeleted;
    } catch (err) {
      throw err;
    }
  }
}
