import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { DeletedAndUpdatedDataResponseDto } from '@/src/infra';
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from '../../dtos';
import { UsersRepository } from '../../infra';
import { FindByIdUserUseCase } from './find-by-id-user.use-case';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
  ) {}

  async execute(
    id: number,
    request: CreateUserRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    try {
      await this.findByIdUserUseCase.execute(id);

      const { password, confirmPassword } = request;
  
      if (password !== confirmPassword) {
        throw new ApplicationException(
          DEFAULT_MESSAGES.ERROR_UPDATE + ' - Passwords do not match',
          HttpStatus.BAD_REQUEST,
        );
      }
  
      const passwordEncrypted = await bcrypt.hash(password, await bcrypt.genSalt());
  
      const userRequest = { ...request, password: passwordEncrypted };
      
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
