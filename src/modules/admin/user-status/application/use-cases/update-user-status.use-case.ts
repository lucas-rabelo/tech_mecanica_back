import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserStatusRequestDto } from '../../dtos';
import { UserStatusRepository } from '../../infra';
import { FindByIdUserStatusUseCase } from './find-by-id-user-status.use-case';

@Injectable()
export class UpdateUserStatusUseCase {
  constructor(
    private readonly userSatusRepository: UserStatusRepository,
    private readonly findByIdUserStatusUseCase: FindByIdUserStatusUseCase,
  ) {}

  async execute(
    id: number,
    request: CreateUserStatusRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdUserStatusUseCase.execute(id);

      const userStatusUpdated = await this.userSatusRepository.update(
        id,
        request,
      );

      if (!userStatusUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return userStatusUpdated;
    } catch (err) {
      throw err;
    }
  }
}
