import { HttpStatus, Injectable } from '@nestjs/common';
import { ResetPasswordAuthRequestDto } from '../../dtos';
import { UsersRepository } from '@/src/modules/admin/users';
import { ValidateTokenJwtService } from '../services';
import { ApplicationException } from '@/src/core';

@Injectable()
export class ResetPasswordAuthUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly validateTokenJwtService: ValidateTokenJwtService
  ) {}

  async execute(token: string, request: ResetPasswordAuthRequestDto) {
    const data = await this.validateTokenJwtService.execute(token, {});

    if(!data) {
      throw new ApplicationException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    return this.usersRepository.update(data.id, request);
  }
}