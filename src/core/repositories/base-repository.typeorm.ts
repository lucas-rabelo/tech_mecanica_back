import { AuditableEntity } from '@/src/infra/database/entities/client';
import {
  DeepPartial,
  IsNull,
  Repository,
  type FindOptionsOrder,
} from 'typeorm';
import {
  DynamicFilterBuilder,
  type DynamicFilterInput,
  type DynamicFilterMap,
} from '../database';
import {
  GetConnectionService,
  RequestContextService,
  TenantConnectionService,
} from '../services';

export abstract class BaseRepositoryTypeOrm<
  TEntity extends AuditableEntity,
> extends GetConnectionService {
  protected abstract entity: new () => TEntity;
  protected relations: string[] = [];

  constructor(
    tenantConn: TenantConnectionService,
    context: RequestContextService,
  ) {
    super(tenantConn, context);
  }

  protected async repo(): Promise<Repository<TEntity>> {
    return this.getRepository(this.entity);
  }

  protected get userId(): number {
    return this.context.getUserId()!;
  }

  async createEntity(data: DeepPartial<TEntity>): Promise<TEntity> {
    const repository = await this.repo();

    const entity = repository.create({
      ...data,
      createdBy: this.userId,
      updatedBy: this.userId,
    });

    return repository.save(entity);
  }

  async updateEntity(id: number, data: DeepPartial<TEntity>): Promise<boolean> {
    const repository = await this.repo();

    const entity = await repository.findOne({
      where: { id } as any,
    });

    if (!entity) return false;

    Object.assign(entity, {
      ...data,
      updatedBy: this.userId,
    });

    await repository.save(entity);
    return true;
  }

  async softDelete(id: number): Promise<boolean> {
    const repository = await this.repo();

    const entity = await repository.findOne({
      where: { id, deletedAt: IsNull() } as any,
    });

    if (!entity) return false;

    entity.deletedAt = new Date();
    entity.deletedBy = this.userId;

    await repository.save(entity); // 🔥 ponto chave

    return true;
  }

  async findActiveById(
    id: number,
  ): Promise<TEntity | null> {
    const repository = await this.repo();

    const qb = repository
      .createQueryBuilder('e')
      .where('e.id = :id', { id })
      .andWhere('e.deletedAt IS NULL');

    this.relations?.forEach((relation) => {
      qb.leftJoinAndSelect(`e.${relation}`, relation);
    });

    return qb.getOne();
  }

  protected async paginateWithFilters(params: {
    filters: DynamicFilterInput;
    filterConfig: DynamicFilterMap<TEntity>;
    page: number;
    itemsPerPage: number;
    order?: FindOptionsOrder<TEntity>;
    alias?: string;
  }): Promise<{
    data: TEntity[];
    total: number;
  }> {
    const {
      filters,
      filterConfig,
      page,
      itemsPerPage,
      order,
      alias = 'e',
    } = params;

    const skip = (page - 1) * itemsPerPage;
    const take = itemsPerPage;

    const repository = await this.repo();

    const qb = repository
      .createQueryBuilder('e')
      .where(`${alias}.deletedAt IS NULL`);

    /**
     * Filtros dinâmicos
     */
    DynamicFilterBuilder.apply(qb, filters, filterConfig, alias);

    console.log({filters});

    if (order) {
      Object.entries(order).forEach(([field, direction]) => {
        qb.addOrderBy(`${alias}.${field}`, direction as 'ASC' | 'DESC');
      });
    }

    qb.skip(skip).take(take);

    this.relations?.forEach((relation) => {
      qb.leftJoinAndSelect(`e.${relation}`, relation);
    });
    
    const [data, total] = await qb.getManyAndCount();
    
    return { data, total };
  }
}
