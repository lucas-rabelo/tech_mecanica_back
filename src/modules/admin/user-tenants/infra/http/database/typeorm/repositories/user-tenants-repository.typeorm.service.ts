import {
  DeletedAndUpdatedDataResponseDto,
  UserTenantsEntity,
} from '@/src/infra';
import {
  CreateUserTenantRequestDto,
  FilterListUserTenantRequestDto,
  ListUserTenantsResponseDto,
  ReadUserTenantResponseDto,
} from '@/src/modules/admin/user-tenants/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { UserTenantsRepository } from '../../user-tenant.repository';
import { UserTenantsMapper } from '../mappers';

@Injectable()
export class UserTenantsRepositoryTypeOrm implements UserTenantsRepository {
  constructor(
    @InjectRepository(UserTenantsEntity)
    private readonly userTenantsRepository: Repository<UserTenantsEntity>,
  ) {}

  async create(
    data: CreateUserTenantRequestDto,
  ): Promise<ReadUserTenantResponseDto> {
    const userTenantCreated = this.userTenantsRepository.create(data);
    const userTenantSaved =
      await this.userTenantsRepository.save(userTenantCreated);

    const userTenantWithRelations = await this.userTenantsRepository.findOne({
      where: { id: userTenantSaved.id },
      relations: {
        user: true,
        tenant: true,
        permission: true,
      },
    });

    if (!userTenantWithRelations) return {} as ReadUserTenantResponseDto;

    return UserTenantsMapper.toDomain(userTenantWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const userTenantDeleted = this.userTenantsRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!userTenantDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadUserTenantResponseDto | null> {
    const userTenantFounded = await this.userTenantsRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
    });

    if (!userTenantFounded) {
      return null;
    }

    return UserTenantsMapper.toDomain(userTenantFounded);
  }

  async list(
    filters: FilterListUserTenantRequestDto,
  ): Promise<ListUserTenantsResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<UserTenantsEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<UserTenantsEntity>
      | FindOptionsWhere<UserTenantsEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.userId) {
      where.userId = Equal(filters.userId);
    }

    if (filters.tenantId) {
      where.tenantId = Equal(filters.tenantId);
    }

    if (filters.permissionId) {
      where.permissionId = Equal(filters.permissionId);
    }

    const [result, total] = await this.userTenantsRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      userTenants: result.map(UserTenantsMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreateUserTenantRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const userTenantUpdated = this.userTenantsRepository.update(id, data);

    if (!userTenantUpdated) {
      return null;
    }

    return { success: true };
  }
}
