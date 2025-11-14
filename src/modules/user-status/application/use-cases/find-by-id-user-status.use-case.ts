import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ReadUserStatusResponseDto } from '../../dtos';
import { UserStatusRepository } from '../../infra';

@Injectable()
export class FindByIdUserStatusUseCase {
  constructor(private readonly userStatusRepository: UserStatusRepository) {}

  async execute(id: number): Promise<ReadUserStatusResponseDto> {
    try {
      const userStatusFounded = await this.userStatusRepository.findById(id);

      if (!userStatusFounded) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      return userStatusFounded;
    } catch (err) {
      throw err;
    }
  }
}
