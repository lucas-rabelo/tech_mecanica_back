import { PrismaService } from '@/src/infra/config';
import { Injectable } from '@nestjs/common';
import { Permission, Prisma } from '@prisma/client';
import { PermissionsRepository } from '../../permissions.repository';
import { CreatePermissionRequestDto, ListPermissionRequestDto, ListPermissionResponseDto, ReadPermissionResponseDto } from '@/src/modules/permissions/dto';
import { PermissionPrismaMapper } from '../mappers';

@Injectable()
export class PermissionsPrismaRepository implements PermissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePermissionRequestDto): Promise<ReadPermissionResponseDto> {
    const permissionCreated = await this.prisma.permission.create({
      data,
    });

    return PermissionPrismaMapper.toDomain(permissionCreated);
  }

  async findById(id: number): Promise<ReadPermissionResponseDto | null> {
    const permissionFounded = await this.prisma.permission.findUnique({
      where: { id },
    });

    if(!permissionFounded) {
      return null;
    }

    return PermissionPrismaMapper.toDomain(permissionFounded);
  }

  async list(filters: ListPermissionRequestDto): Promise<ListPermissionResponseDto> {
    let where: Prisma.PermissionWhereInput = {};

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    if(filters.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      }
    }

    const total = await this.prisma.permission.count({
      where,
    });

    const permissions = await this.prisma.permission.findMany({
      where,
      skip,
      take,
    });

    return {
      permissions: permissions.map(permission => ({
        id: permission.id,
        name: permission.name,
      })),
      total,
    };
  }

  async update(id: number, data: CreatePermissionRequestDto): Promise<ReadPermissionResponseDto> {
    const permissionUpdated = await this.prisma.permission.update({
      where: { id },
      data
    });

    return PermissionPrismaMapper.toDomain(permissionUpdated);
  }

  async delete(id: number): Promise<ReadPermissionResponseDto> {
    const permissionDeleted = await this.prisma.permission.delete({
      where: { id },
    });

    return PermissionPrismaMapper.toDomain(permissionDeleted);
  }
}
