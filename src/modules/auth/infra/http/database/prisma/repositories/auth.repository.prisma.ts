import { PrismaService } from '@/src/infra';
import {
  FindUserAuthResponseDto,
  ForgetPasswordAuthRequestDto,
  LoginUserAuthRequestDto,
  RegisterUserAuthRequestDto,
  ResetPasswordAuthRequestDto,
} from '@/src/modules/auth/dto';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../auth.repository';
import { AuthPrismaMapper } from '../mappers';

@Injectable()
export class AuthPrismaRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async forgetPassword(
    data: ForgetPasswordAuthRequestDto,
  ): Promise<null | FindUserAuthResponseDto> {
    const { email } = data;

    const userFounded = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userStatus: true,
        permission: true,
        tenant: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return AuthPrismaMapper.toDomain(userFounded);
  }

  async login(
    data: LoginUserAuthRequestDto,
  ): Promise<null | FindUserAuthResponseDto> {
    const { email } = data;

    const userFounded = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        userStatus: true,
        permission: true,
        tenant: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return AuthPrismaMapper.toDomain(userFounded);
  }

  async register(
    data: RegisterUserAuthRequestDto,
  ): Promise<FindUserAuthResponseDto> {
    const user = AuthPrismaMapper.toPrisma(data);

    const userCreated = await this.prisma.user.create({
      data: user,
      include: {
        userStatus: true,
        permission: true,
        tenant: true,
      },
    });

    return AuthPrismaMapper.toDomain(userCreated);
  }

  async resetPassword(
    id: number,
    data: ResetPasswordAuthRequestDto,
  ): Promise<boolean> {
    const { password } = data;

    const userUpdated = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    if (!userUpdated) {
      return false;
    } else {
      return true;
    }
  }
}
