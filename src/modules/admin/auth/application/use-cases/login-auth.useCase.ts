import { ApplicationException } from '@/src/core';
import { UsersRepository } from '@/src/modules/admin/users';
import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthRequestDto, SendTokenResponseDto } from '../../dtos';
import { ComparePasswordService, CreateTokenJwtService } from '../services';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly comparePasswordService: ComparePasswordService,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) {}

  async execute(request: LoginAuthRequestDto): Promise<SendTokenResponseDto> {
    const { email, password } = request;

    const userFounded =
      await this.usersRepository.findByEmail(email);

    if (!userFounded) {
      throw new ApplicationException(
        'Email or Password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isSamePassword = await this.comparePasswordService.execute(
      password,
      userFounded.password,
    );

    if (!isSamePassword) {
      throw new ApplicationException(
        'Email or Password is incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return this.createTokenJwtService.execute(userFounded);
  }
}
