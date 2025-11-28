import { DeletedAndUpdatedDataResponseDto, UsersEntity } from '@/src/infra';
import { FindUserAuthResponseDto } from '@/src/modules/admin/auth';
import {
  CreateUserRequestDto,
  FilterListUserRequestDto,
  ListUserResponseDto,
  ReadUserResponseDto,
  UpdateUserRequestDto,
} from '@/src/modules/admin/users/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { UsersRepository } from '../../users.repository';
import { UsersMapper } from '../mappers';

@Injectable()
export class UsersRepositoryTypeOrm implements UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(data: CreateUserRequestDto): Promise<ReadUserResponseDto> {
    console.log({data});

    const dataFormatted = UsersMapper.toDatabase(data);

    const userCreated = this.usersRepository.create(dataFormatted);
    const userSaved = await this.usersRepository.save(userCreated);

    const userWithRelations = await this.usersRepository.findOne({
      where: { id: userSaved.id },
      relations: {
        tenants: true,
        permissions: true,
        userStatus: true,
      },
    });

    if (!userWithRelations) return {} as ReadUserResponseDto;

    return UsersMapper.toDomain(userWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    const userDeleted = this.usersRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!userDeleted) {
      return { success: false };
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadUserResponseDto | null> {
    const userFounded = await this.usersRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
      relations: {
        tenants: true,
        permissions: true,
        userStatus: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return UsersMapper.toDomain(userFounded);
  }

  async findByEmail(email: string): Promise<FindUserAuthResponseDto | null> {
    const userFounded = await this.usersRepository.findOne({
      where: {
        email,
        deletedAt: undefined,
      },
      relations: {
        tenants: true,
        permissions: true,
        userStatus: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return {
      ...UsersMapper.toDomain(userFounded),
      password: userFounded.password,
    };
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<FindUserAuthResponseDto | null> {
    const userFounded = await this.usersRepository.findOne({
      where: {
        email,
        password,
        deletedAt: undefined,
      },
      relations: {
        tenants: true,
        permissions: true,
        userStatus: true,
      },
    });

    if (!userFounded) {
      return null;
    }

    return {
      ...UsersMapper.toDomain(userFounded),
      password: userFounded.password,
    };
  }

  async list(filters: FilterListUserRequestDto): Promise<ListUserResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<UsersEntity> = { id: 'ASC' };

    let where: FindOptionsWhere<UsersEntity> | FindOptionsWhere<UsersEntity>[] =
      {
        deletedAt: undefined,
      };

    if (filters.id) {
      where.id = Equal(filters.id);
    }

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.email) {
      where.email = Like(`%${filters.email}%`);
    }

    if (filters.birthDate) {
      where.birthDate = filters.birthDate;
    }

    if (filters.document) {
      where.document = Like(`%${filters.document}%`);
    }

    if (filters.tenantId) {
      where.tenantId = Equal(filters.tenantId);
    }

    if (filters.permissionId) {
      where.permissionId = Equal(filters.permissionId);
    }

    if (filters.userStatusId) {
      where.userStatusId = Equal(filters.userStatusId);
    }

    const [result, total] = await this.usersRepository.findAndCount({
      where,
      skip,
      take,
      order,
      relations: {
        tenants: true,
        permissions: true,
        userStatus: true,
      },
    });

    return {
      total,
      users: result.map(UsersMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: UpdateUserRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto> {
    const dataFormatted = UsersMapper.toDatabase(data);
    const userUpdated = this.usersRepository.update(id, dataFormatted);

    if (!userUpdated) {
      return { success: false };
    }

    return { success: true };
  }
}
