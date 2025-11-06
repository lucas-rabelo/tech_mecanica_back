import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterUserAuthRequestDto, SendTokenResponseDto } from '../../dto';
import { AuthRepository } from '../../infra';
import { CreateTokenJwtAuthService, EncryptPasswordAuthService } from '../services';

@Injectable()
export class RegisterAuthUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly createTokenJwtAuthServicc: CreateTokenJwtAuthService,
    private readonly encryptPasswordAuthService: EncryptPasswordAuthService,
  ) {}

  async execute(
    request: RegisterUserAuthRequestDto,
  ): Promise<SendTokenResponseDto> {
    const { password, confirmPassword } = request;
    
    if(password !== confirmPassword) {
      throw new BadRequestException('The password is not de same of the confirmation');
    }

    const dataForCreated = {
      ...request,
      password: await this.encryptPasswordAuthService.execute(password),
    }

    const userCreated = await this.authRepository.register(dataForCreated);

    if (!userCreated) {
      throw new BadRequestException(
        'Ops! We have a problem to create your account. Try again later',
      );
    }

    return this.createTokenJwtAuthServicc.execute(userCreated);
  }
}
