import { DeletedAndUpdatedDataResponseDto, PagesEntity } from '@/src/infra';
import {
  CreatePageRequestDto,
  FilterListPageRequestDto,
  ListPagesResponseDto,
  ReadPageResponseDto,
} from '@/src/modules/admin/pages/dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Equal,
  FindOptionsOrder,
  FindOptionsWhere,
  Like,
  Repository,
} from 'typeorm';
import { PagesRepository } from '../../pages.repository';
import { PageMapper } from '../mappers';

@Injectable()
export class PageRepositoryTypeOrm implements PagesRepository {
  constructor(
    @InjectRepository(PagesEntity)
    private readonly pagesRepository: Repository<PagesEntity>,
  ) {}

  async create(data: CreatePageRequestDto): Promise<ReadPageResponseDto> {
    const pageCreated = this.pagesRepository.create(data);
    const pageSaved = await this.pagesRepository.save(pageCreated);

    const pageWithRelations = await this.pagesRepository.findOne({
      where: { id: pageSaved.id },
      relations: {
        modules: true,
      },
    });

    if (!pageWithRelations) return {} as ReadPageResponseDto;

    return PageMapper.toDomain(pageWithRelations);
  }

  async delete(id: number): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const pageDeleted = this.pagesRepository.update(id, {
      deletedAt: new Date(),
    });

    if (!pageDeleted) {
      return null;
    }

    return { success: true };
  }

  async findById(id: number): Promise<ReadPageResponseDto | null> {
    const pageFounded = await this.pagesRepository.findOne({
      where: {
        id,
        deletedAt: undefined,
      },
      relations: {
        modules: true,
      }
    });

    if (!pageFounded) {
      return null;
    }

    return PageMapper.toDomain(pageFounded);
  }

  async list(filters: FilterListPageRequestDto): Promise<ListPagesResponseDto> {
    const { page, itemsPerPage } = filters;

    const skip = Number((page - 1) * itemsPerPage);
    const take = Number(itemsPerPage);
    const order: FindOptionsOrder<PagesEntity> = { id: 'ASC' };

    let where: FindOptionsWhere<PagesEntity> | FindOptionsWhere<PagesEntity>[] =
      {
        deletedAt: undefined,
      };

    if (filters.name) {
      where.name = Like(`%${filters.name}%`);
    }

    if (filters.moduleId) {
      where.moduleId = Equal(filters.moduleId);
    }

    const [result, total] = await this.pagesRepository.findAndCount({
      where,
      skip,
      take,
      order,
      relations: {
        modules: true
      }
    });

    return {
      total,
      pages: result.map(PageMapper.toDomain),
    };
  }

  async update(
    id: number,
    data: CreatePageRequestDto,
  ): Promise<DeletedAndUpdatedDataResponseDto | null> {
    const pageUpdated = this.pagesRepository.update(id, data);

    if (!pageUpdated) {
      return null;
    }

    return { success: true };
  }
}
