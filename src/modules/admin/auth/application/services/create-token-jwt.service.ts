import { ApplicationException } from '@/src/core';
import { ReadUserResponseDto } from '@/src/modules/admin/users';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SendTokenResponseDto } from '../../dtos';
import { ValidateTokenJwtService } from './validate-token-jwt.service';

@Injectable()
export class CreateTokenJwtService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateTokenJwtService: ValidateTokenJwtService,
  ) {}

  execute(user: ReadUserResponseDto): SendTokenResponseDto {
    const token = this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      {
        expiresIn: '7 days',
        subject: String(user.id),
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
