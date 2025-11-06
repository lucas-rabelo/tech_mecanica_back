import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserAuthRequestDto, SendTokenResponseDto } from '../../dto';
import { ReadUserResponseDto } from '@/src/modules/users';
import { ValidateTokenJwtAuthService } from './validate-token-jwt-auth.service';

@Injectable()
export class CreateTokenJwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly validateTokenJwtAuthService: ValidateTokenJwtAuthService,
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

    const tokenIsValid = this.validateTokenJwtAuthService.execute(token, {});

    if(!tokenIsValid) {
      throw new InternalServerErrorException('Error in creation of the token');
    }

    return {
      access_token: token
    }
  }
}
