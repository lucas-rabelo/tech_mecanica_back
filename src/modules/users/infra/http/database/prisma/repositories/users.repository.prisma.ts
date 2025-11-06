import { PrismaService } from '@/src/infra/config/prisma';
import {
  CreateUserRequestDto,
  ListUserRequestDto,
  ListUserResponseDto,
  ReadUserResponseDto,
} from '@/src/modules/users/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '../../users.repository';
import { UsersPrismaMapper } from '../mappers/users.mappers';

@Injectable()
export class UsersPrismaRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserStatusId(
    userStatusId: number,
  ): Promise<ReadUserResponseDto | null> {
    const userFounded = await this.prisma.user.findFirst({
      where: { 
        userStatusId,
        deletedAt: {
          equals: null,
        }
      },
      include: {
        tenant: true,
        userStatus: true,
        permission: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return UsersPrismaMapper.toDomain(userFounded);
  }

  async create(data: CreateUserRequestDto): Promise<ReadUserResponseDto> {
    const user = UsersPrismaMapper.toPrisma(data);

    const userCreated = await this.prisma.user.create({
      data: user,
      include: {
        tenant: true,
        userStatus: true,
        permission: true,
      },
    });

    return UsersPrismaMapper.toDomain(userCreated);
  }

  async update(
    id: number,
    data: CreateUserRequestDto,
  ): Promise<ReadUserResponseDto> {
    const user = UsersPrismaMapper.toPrisma(data);

    const userUpdated = await this.prisma.user.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        }
      },
      data: user,
      include: {
        tenant: true,
        userStatus: true,
        permission: true,
      },
    });

    return UsersPrismaMapper.toDomain(userUpdated);
  }

  async delete(id: number): Promise<ReadUserResponseDto | null> {
    const userDeleted = await this.prisma.user.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        }
      },
      data: {
        deletedAt: new Date().toISOString(),
      },
      include: {
        tenant: true,
        userStatus: true,
        permission: true,
      },
    });

    if (!userDeleted) {
      return null;
    }

    return UsersPrismaMapper.toDomain(userDeleted);
  }

  async findById(id: number): Promise<ReadUserResponseDto | null> {
    const userFounded = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        tenant: true,
        userStatus: true,
        permission: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return UsersPrismaMapper.toDomain(userFounded);
  }

  async list(filters: ListUserRequestDto): Promise<ListUserResponseDto> {
    let where: Prisma.UserWhereInput = { deletedAt: {
      equals: null,
    } };

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if (filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters.email) {
      where.email = {
        contains: filters.email,
        mode: 'insensitive',
      };
    }

    if (filters.document) {
      where.document = {
        contains: filters.document,
        mode: 'insensitive',
      };
    }

    if (filters.permissionId) {
      where.permissionId = {
        equals: filters.permissionId,
      };
    }

    if (filters.tenantId) {
      where.tenantId = {
        equals: filters.tenantId,
      };
    }

    if (filters.userStatusId) {
      where.userStatusId = {
        equals: filters.userStatusId,
      };
    }

    where.deletedAt = {
      equals: null,
    };

    const total = await this.prisma.user.count({
      where,
    });

    const users = await this.prisma.user.findMany({
      where,
      skip,
      take,
      include: {
        tenant: true,
        userStatus: true,
        permission: true,
      },
    });

    return {
      users: users.map(UsersPrismaMapper.toDomain),
      total,
    };
  }
}
