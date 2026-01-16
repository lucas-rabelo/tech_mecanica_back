import { ApplicationException } from '@/src/core';
import { UsersRepository } from '../../../users/infra/http/database/users.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginAuthRequestDto, SendTokenResponseDto, type CreateTokenRequestDto } from '../../dtos';
import { ComparePasswordService, CreateTokenJwtService } from '../services';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly comparePasswordService: ComparePasswordService,
    private readonly createTokenJwtService: CreateTokenJwtService,
  ) {}

  async execute(request: LoginAuthRequestDto): Promise<SendTokenResponseDto> {
    const { email, tenantId, password, scope } = request;

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

    const createTokenRequest: CreateTokenRequestDto = {
      id: userFounded.id,
      name: userFounded.name,
      email: userFounded.email,
      document: userFounded.document,
      tenantId,
      scope,
    };

    return this.createTokenJwtService.execute(createTokenRequest);
  }
}
