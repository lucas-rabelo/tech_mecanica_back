import { Injectable } from '@nestjs/common';
import { ResetPasswordAuthRequestDto } from '../../dto';
import { AuthRepository } from '../../infra';

@Injectable()
export class ResetPasswordAuthUseCase {
  constructor(private readonly authRepository: AuthRepository) {}

  async execute(id: number, request: ResetPasswordAuthRequestDto) {
    return this.authRepository.resetPassword(id, request);
  }
}
