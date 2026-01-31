import { ApplicationException, DEFAULT_MESSAGES, IdentifyAuthScope } from '@/src/core';
import { UsersRepository } from '@/src/modules/admin/users';
import { HttpStatus, Injectable } from '@nestjs/common';
import {
  ForgotPasswordAuthRequestDto,
  SendLinkResetPasswordAuthResponseDto,
  type CreateTokenRequestDto,
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
    
    let userFoundedFormatted: CreateTokenRequestDto = {
      id: userFounded.id,
      name: userFounded.name,
      email: userFounded.email,
      document: userFounded.document,
      scope: userFounded.typeUser,
    };
    
    const hasOneTenant = userFounded.userTenants.length == 1;
    if (hasOneTenant) {
      const userTenant = userFounded.userTenants[0];

      userFoundedFormatted = {
        ...userFoundedFormatted,
        tenantId: userTenant.tenant.id,
      };
    } else {
      userFoundedFormatted = {
        ...userFoundedFormatted,
        tenantId: null,
      };
    }

    const token = this.createTokenJwtService.execute(userFoundedFormatted);

    return {
      link: `${process.env.FRONT_BASE_URL}?token=${token.access_token}`,
    };
  }
}
