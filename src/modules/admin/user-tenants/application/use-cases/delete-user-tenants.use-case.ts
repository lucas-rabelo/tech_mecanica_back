import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserTenantsRepository } from '../../infra';

@Injectable()
export class DeleteUserTenantsUseCase {
  constructor(private readonly userTenantsRepository: UserTenantsRepository) {}

  async execute(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      const userTenantsDeleted = await this.userTenantsRepository.delete(id);

      if (!userTenantsDeleted) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_DELETE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return userTenantsDeleted;
    } catch (err) {
      throw err;
    }
  }
}
