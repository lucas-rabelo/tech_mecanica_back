import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from '../../infra';
import { CreateUserRequestDto } from "../../dto";
import { EncryptPasswordAuthService } from "@/src/modules/auth/application/services/encrypt-password-auth.service";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly encryptPasswordAuthService: EncryptPasswordAuthService,
  ) {}

  async execute(request: CreateUserRequestDto) {
    const { password, confirmPassword } = request;

    const isSamePassword = password === confirmPassword;
    if(!isSamePassword) {
      throw new BadRequestException('Password is diferent');
    }

    const dataForCreated = {
      ...request,
      password: await this.encryptPasswordAuthService.execute(password),
    }

    return this.usersRepository.create(dataForCreated);
  }
}