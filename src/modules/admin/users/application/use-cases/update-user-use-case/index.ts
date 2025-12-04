import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { EncryptedPasswordService } from '../../../../auth/application/services/encrypted-password.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../infra';
import { FindByIdUserUseCase } from '../find-by-id-user-use-case';
import { IUpdateUserUseCaseRequest } from './types';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly encryptedPasswordService: EncryptedPasswordService,
  ) {}

  async execute({
    id,
    isAdmin,
    request,
    tenantId,
  }: IUpdateUserUseCaseRequest): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdUserUseCase.execute({
        id,
        isAdmin,
        tenantId,
      });

      const { password, confirmPassword } = request;

      if (password !== confirmPassword) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE + ' - Passwords do not match',
          HttpStatus.BAD_REQUEST,
        );
      }

      const passwordEncrypted =
        await this.encryptedPasswordService.execute(password);

      const userRequest = {
        ...request,
        password: passwordEncrypted,
        tenantId: isAdmin ? request.tenantId : tenantId,
      };

      const userUpdated = await this.usersRepository.update(id, userRequest);

      if (!userUpdated) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE,
          HttpStatus.BAD_REQUEST,
        );
      }

      return userUpdated;
    } catch (err) {
      throw err;
    }
  }
}
