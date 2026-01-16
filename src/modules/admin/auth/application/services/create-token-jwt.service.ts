import { ApplicationException } from '@/src/core';
import { ReadUserResponseDto } from '@/src/modules/admin/users';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendTokenResponseDto, type CreateTokenRequestDto } from '../../dtos';
import { ValidateTokenJwtService } from './validate-token-jwt.service';

@Injectable()
export class CreateTokenJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateTokenJwtService: ValidateTokenJwtService,
  ) {}

  execute(request: CreateTokenRequestDto): SendTokenResponseDto {
    const token = this.jwtService.sign(
      request,
      {
        expiresIn: '7 days',
        subject: String(request.id),
      },
    );

    const tokenIsValid = this.validateTokenJwtService.execute(token, {});

    if (!tokenIsValid) {
      throw new ApplicationException(
        'Error in creation of the token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      access_token: token,
    };
  }
}
