import { ApplicationException, DEFAULT_MESSAGES } from '@/src/core';
import { UsersRepository } from '@/src/modules/admin/users';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ForgotPasswordAuthRequestDto,
  SendLinkResetPasswordAuthResponseDto,
} from '../../dtos';
import { CreateTokenJwtService } from '../services';

@Injectable()
export class ForgotPasswordAuthUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) {}

  async execute(
    request: ForgotPasswordAuthRequestDto,
  ): Promise<SendLinkResetPasswordAuthResponseDto> {
    const userFounded = await this.usersRepository.findByEmail(request.email);

    if (!userFounded) {
      throw new ApplicationException(
        DEFAULT_MESSAGES.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const token = this.createTokenJwtService.execute(userFounded);

    return {
      link: `${process.env.FRONT_BASE_URL}?token=${token.access_token}`,
    };
  }
}
