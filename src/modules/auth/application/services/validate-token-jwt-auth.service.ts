import { Injectable } from '@nestjs/common';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { FindUserAuthResponseDto } from '../../dto';

@Injectable()
export class ValidateTokenJwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(
    token: string,
    options: JwtVerifyOptions,
  ): Promise<null | FindUserAuthResponseDto> {
    const validated = await this.jwtService.verifyAsync(token, options);

    if (validated) {
      return validated;
    } else {
      return null;
    }
  }
}
