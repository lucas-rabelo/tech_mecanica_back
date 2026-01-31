import { ApplicationException } from '@/src/core';
import { DEFAULT_MESSAGES, IdentifyAuthScope, USER_STATUS_ID_PENDING } from '@/src/core/constants';
import { UsersRepository } from '@/src/modules/admin/users';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthRequestDto, SendTokenResponseDto, type CreateTokenRequestDto } from '../../dtos';
import { CreateTokenJwtService, EncryptedPasswordService } from '../services';

@Injectable()
export class RegisterAuthUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly createTokenJwtService: CreateTokenJwtService,
    private readonly encryptedPasswordService: EncryptedPasswordService,
  ) {}

  async execute(
    request: RegisterAuthRequestDto,
    tenantId: number,
  ): Promise<SendTokenResponseDto> {
    const { password, confirmPassword } = request;

    if (password !== confirmPassword) {
      throw new BadRequestException(
        'The password is not de same of the confirmation',
      );
    }

    const passwordEncrypted = await this.encryptedPasswordService.execute(
      password,
    );

    const dataForCreated = {
      name: request.name,
      email: request.email,
      birthDate: request.birthDate,
      phone: request.phone,
      password: passwordEncrypted,
      confirmPassword: request.confirmPassword,
      document: request.document,
      tenantId,
      userStatusId: USER_STATUS_ID_PENDING,
    };

    const userCreated = await this.usersRepository.create(dataForCreated);

    if (!userCreated) {
      throw new ApplicationException(
        DEFAULT_MESSAGES.ERROR_CREATE +
          ' Ops! We have a problem to create your account. Try again later',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userCreatedFormatted: CreateTokenRequestDto = {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      document: userCreated.document,
      tenantId,
      scope: IdentifyAuthScope.USER
    };

    return this.createTokenJwtService.execute(userCreatedFormatted);
  }
}
