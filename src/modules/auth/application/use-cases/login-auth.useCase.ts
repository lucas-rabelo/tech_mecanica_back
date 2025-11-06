import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserAuthRequestDto, SendTokenResponseDto } from '../../dto';
import { AuthRepository } from '../../infra';
import {
  ComparePasswordAuthService,
  CreateTokenJwtAuthService,
} from '../services';

@Injectable()
export class LoginAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly comparePasswordAuthService: ComparePasswordAuthService,
    private readonly createTokenJwtAuthService: CreateTokenJwtAuthService,
  ) {}

  async execute(
    request: LoginUserAuthRequestDto,
  ): Promise<SendTokenResponseDto> {
    const userFounded = await this.authRepository.login(request);

    if (!userFounded) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    const isSamePassword = await this.comparePasswordAuthService.execute(
      request.password,
      userFounded.password,
    );

    if (!isSamePassword) {
      throw new UnauthorizedException('Email or Password is incorrect');
    }

    return this.createTokenJwtAuthService.execute(userFounded);
  }
}
