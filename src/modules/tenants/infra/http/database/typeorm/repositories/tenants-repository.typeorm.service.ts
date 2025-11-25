import { DeletedAndUpdatedDataResponseDto, TenantsEntity } from '@/src/infra';
import {
  CreateTenantsRequestDto,
  FiltersListTenantsRequestDto,
  ListTenantsResponseDto,
  ReadTenantsResponseDto,
} from '@/src/modules/tenants/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { TenantsRepository } from '../../tenants.repository';
import { TenantsMapper } from '../mappers';

@Injectable()
export class TenantsRepositoryTypeOrm implements TenantsRepository {
  constructor(
    @InjectRepository(TenantsEntity)
    private readonly tenantsRepository: Repository<TenantsEntity>,
  ) {}

  async create(data: CreateTenantsRequestDto): Promise<ReadTenantsResponseDto> {
    const tenantCreated = this.tenantsRepository.create(data);
    const tenantSaved = await this.tenantsRepository.save(tenantCreated);

    const tenantWithRelations = await this.tenantsRepository.findOne({
      where: { id: tenantSaved.id },
      relations: ['tenantStatus'],
    });

    if (!tenantWithRelations) return {} as ReadTenantsResponseDto;

    return TenantsMapper.toDomain(tenantWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    this.tenantsRepository.update(id, {
      deletedAt: new Date(),
    });

    return { success: true };
  }

  async findById(id: number): Promise<ReadTenantsResponseDto | null> {
    const permissionFounded = await this.tenantsRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
      relations: {
        tenantStatus: true,
      },
    });

    if (!permissionFounded) {
      return null;
    }

    return TenantsMapper.toDomain(permissionFounded);
  }

  async findBySubdomain(subdomain: string): Promise<ReadTenantsResponseDto | null> {
    const permissionFounded = await this.tenantsRepository.findOne({
      where: {
        subdomain,
        deletedAt: undefined,
      },
      relations: {
        tenantStatus: true,
      },
    });

    if (!permissionFounded) {
      return null;
    }

    return TenantsMapper.toDomain(permissionFounded);
  }

  async list(
    filters: FiltersListTenantsRequestDto,
  ): Promise<ListTenantsResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<TenantsEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<TenantsEntity>
      | FindOptionsWhere<TenantsEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.subdomain) {
      where.subdomain = Like(`%${filters.subdomain}%`);
    }

    if (filters.tenantStatusId) {
      where.tenantStatusId = Equal(filters.tenantStatusId);
    }

    const [result, total] = await this.tenantsRepository.findAndCount({
      where,
      skip,
      take,
      order,
      relations: {
        tenantStatus: true,
      },
    });

    return {
      total,
      tenants: result.map(TenantsMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreateTenantsRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const TenantStatusUpdated = this.tenantsRepository.update(id, data);

    if (!TenantStatusUpdated) {
      return null;
    }

    return { success: true };
  }
}
