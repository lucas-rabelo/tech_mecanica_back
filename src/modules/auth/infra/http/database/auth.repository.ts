import {
  FindUserAuthResponseDto,
  ForgetPasswordAuthRequestDto,
  LoginUserAuthRequestDto,
  RegisterUserAuthRequestDto,
  ResetPasswordAuthRequestDto,
} from '../../../dto';

export abstract class AuthRepository {
  abstract register(
    data: RegisterUserAuthRequestDto,
  ): Promise<null | FindUserAuthResponseDto>;
  abstract login(
    data: LoginUserAuthRequestDto,
  ): Promise<null | FindUserAuthResponseDto>;
  abstract forgetPassword(data: ForgetPasswordAuthRequestDto): Promise<null | FindUserAuthResponseDto>;
  abstract resetPassword(id: number, data: ResetPasswordAuthRequestDto): Promise<boolean>;
}
