import { PrismaService } from '@/src/infra/config/prisma/prisma.service';
import {
  CreateUserStatusRequestDto,
  CreateUserStatusResponseDto,
  ListUserStatusRequestDto,
  UpdateUserStatusRequestDto,
} from '@/src/modules/user-status/dto';
import { Injectable } from '@nestjs/common';
import { UserStatusRepository } from '../../user-status.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserStatusPrismaRepository implements UserStatusRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<CreateUserStatusResponseDto | null> {
    return this.prisma.userStatus.findUnique({
      where: { id },
    });
  }
  async create(
    data: CreateUserStatusRequestDto,
  ): Promise<CreateUserStatusResponseDto> {
    return this.prisma.userStatus.create({
      data,
    });
  }
  async update(
    id: number,
    data: UpdateUserStatusRequestDto,
  ): Promise<CreateUserStatusResponseDto> {
    return this.prisma.userStatus.update({
      where: { id },
      data,
    });
  }
  async delete(id: number): Promise<CreateUserStatusResponseDto> {
    return this.prisma.userStatus.delete({
      where: { id },
    });
  }
  async findAll(
    filters: ListUserStatusRequestDto,
  ): Promise<CreateUserStatusResponseDto[]> {
    let where: Prisma.UserStatusWhereInput = {};

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.id) {
      where.id = {
        equals: filters.id,
      };
    }

    return this.prisma.userStatus.findMany({
      orderBy: {
        name: 'asc',
      },
      where,
      skip,
      take,
    });
  }
}
