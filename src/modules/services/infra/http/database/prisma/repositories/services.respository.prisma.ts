import { PrismaService } from '@/src/infra';
import {
  CreateServiceRequestDto,
  ListServicesRequestDto,
  ListServicesResponseDto,
  ReadServiceResponseDto,
} from '@/src/modules/services/dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ServicesRepository } from '../../services.respository';
import { ServicePrismaMappers } from '../mappers';

@Injectable()
export class ServicesPrismaRepository implements ServicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateServiceRequestDto): Promise<ReadServiceResponseDto> {
    const serviceCreated = await this.prisma.service.create({
      data,
    });

    return ServicePrismaMappers.toDomain(serviceCreated);
  }

  async delete(id: number): Promise<ReadServiceResponseDto | null> {
    const serviceDeleted = await this.prisma.service.update({
      where: {
        id,
        deletedAt: {
          equals: null,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if(!serviceDeleted) {
      return null;
    }

    return ServicePrismaMappers.toDomain(serviceDeleted);
  }

  async findById(id: number): Promise<ReadServiceResponseDto | null> {
    const serviceFounded = await this.prisma.service.findUnique({
      where: {
        id,
      },
    });

    if (!serviceFounded) {
      return null;
    }

    return ServicePrismaMappers.toDomain(serviceFounded);
  }

  async update(
    id: number,
    data: CreateServiceRequestDto,
  ): Promise<ReadServiceResponseDto> {
    const serviceUpdated = await this.prisma.service.update({
      where: {
        id,
      },
      data,
    });

    return ServicePrismaMappers.toDomain(serviceUpdated);
  }

  async list(
    filters: ListServicesRequestDto,
  ): Promise<ListServicesResponseDto> {
    let where: Prisma.ServiceWhereInput = {};

    const { itemsPerPage, page } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);

    where.name = {
      contains: filters.name,
      mode: 'insensitive',
    };

    const total = await this.prisma.service.count({
      where,
    });

    const services = await this.prisma.service.findMany({
      where,
      skip,
      take,
      include: {
        branchServices: {
          include: {
            service: true,
          },
        },
      },
    });

    return {
      services: services.map(ServicePrismaMappers.toDomain),
      total,
    };
  }
}
