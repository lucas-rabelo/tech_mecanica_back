import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ForgetPasswordAuthRequestDto, SendLinkResetPasswordAuthResponseDto } from '../../dto';
import { AuthRepository } from '../../infra';
import { CreateTokenJwtAuthService } from '../services';

@Injectable()
export class ForgetPasswordAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly createTokenJwtAuthService: CreateTokenJwtAuthService,
  ) {}

  async execute(request: ForgetPasswordAuthRequestDto): Promise<SendLinkResetPasswordAuthResponseDto> {
    const userFounded = await this.authRepository.forgetPassword(request);

    if(!userFounded) {
      throw new UnauthorizedException('User not authorized');
    }

    const token = this.createTokenJwtAuthService.execute(userFounded);

    return {
      link: `${process.env.FRONT_BASE_URL}?token=${token.access_token}`
    };
  }
}
