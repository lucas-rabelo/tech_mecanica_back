import { ApplicationException } from '@/src/core';
import { DEFAULT_MESSAGES, USER_STATUS_ID_PENDING } from '@/src/core/constants';
import { UsersRepository } from '@/src/modules/admin/users';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthRequestDto, SendTokenResponseDto } from '../../dtos';
import { CreateTokenJwtService, EncryptPasswordService } from '../services';

@Injectable()
export class RegisterAuthUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly createTokenJwtService: CreateTokenJwtService,
    private readonly encryptPasswordService: EncryptPasswordService,
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

    const dataForCreated = {
      name: request.name,
      email: request.email,
      birthDate: request.birthDate,
      phone: request.phone,
      password: request.password,
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

    return this.createTokenJwtService.execute(userCreated);
  }
}
