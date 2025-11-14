import {
  DeletedAndUpdatedDataResponseDto,
  UserStatusEntity,
} from '@/src/infra';
import {
  CreateUserStatusRequestDto,
  FilterListUserStatusRequestDto,
  ListUserStatusResponseDto,
  ReadUserStatusResponseDto,
} from '@/src/modules/user-status/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Repository } from 'typeorm';
import { UserStatusRepository } from '../../user-status.repository';
import { UserStatusMapper } from '../mappers';

@Injectable()
export class UserStatusRepositoryTypeOrm implements UserStatusRepository {
  constructor(
    @InjectRepository(UserStatusEntity)
    private readonly userStatusRepository: Repository<UserStatusEntity>,
  ) {}

  async create(
    data: CreateUserStatusRequestDto,
  ): Promise<ReadUserStatusResponseDto> {
    const userStatusCreated = this.userStatusRepository.create(data);
    const userStatusSaved =
      await this.userStatusRepository.save(userStatusCreated);

    return UserStatusMapper.toDomain(userStatusSaved);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionDeleted = this.userStatusRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!permissionDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadUserStatusResponseDto | null> {
    const permissionFounded = await this.userStatusRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
    });

    if (!permissionFounded) {
      return null;
    }

    return UserStatusMapper.toDomain(permissionFounded);
  }

  async list(
    filters: FilterListUserStatusRequestDto,
  ): Promise<ListUserStatusResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<UserStatusEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<UserStatusEntity>
      | FindOptionsWhere<UserStatusEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.name) {
      where.name = filters.name;
    }

    const [result, total] = await this.userStatusRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      userStatus: result.map(UserStatusMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreateUserStatusRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const userStatusUpdated = this.userStatusRepository.update(id, data);

    if (!userStatusUpdated) {
      return null;
    }

    return { success: true };
  }
}
