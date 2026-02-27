import { DeletedAndUpdatedDataResponseDto, ModulesEntity } from '@/src/infra';
import {
  CreateModuleRequestDto,
  FilterListModuleRequestDto,
  ListModulesResponseDto,
  ReadModuleResponseDto,
} from '@/src/modules/admin/modules/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, FindOptionsWhere, Like, Repository } from 'typeorm';
import { ModulesRepository } from '../../modules.repository';
import { ModuleMapper } from '../mappers';

@Injectable()
export class ModuleRepositoryTypeOrm implements ModulesRepository {
  constructor(
    @InjectRepository(ModulesEntity)
    private readonly modulesRepository: Repository<ModulesEntity>,
  ) {}

  async create(data: CreateModuleRequestDto): Promise<ReadModuleResponseDto> {
    const permissionCreated = this.modulesRepository.create(data);
    const permissionSaved =
      await this.modulesRepository.save(permissionCreated);
    return ModuleMapper.toDomain(permissionSaved);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto> {
    const permissionDeleted = await this.modulesRepository.update(id, {
      deletedAt: new Date(),
    });

    return { success: permissionDeleted ? false : true };
  }

  async findById(id: number): Promise<ReadModuleResponseDto | null> {
    const permissionFounded = await this.modulesRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
    });

    if (!permissionFounded) {
      return null;
    }

    return ModuleMapper.toDomain(permissionFounded);
  }

  async list(
    filters: FilterListModuleRequestDto,
  ): Promise<ListModulesResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<ModulesEntity> = { id: 'ASC' };

    let where:
      | FindOptionsWhere<ModulesEntity>
      | FindOptionsWhere<ModulesEntity>[] = {
      deletedAt: undefined,
    };

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    const [result, total] = await this.modulesRepository.findAndCount({
      where,
      skip,
      take,
      order,
    });

    return {
      total,
      modules: result.map(ModuleMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreateModuleRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const permissionUpdated = this.modulesRepository.update(id, data);

    if (!permissionUpdated) {
      return null;
    }

    return { success: true };
  }
}
