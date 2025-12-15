import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { TenantConnectionService } from './tenant-connection.service';
import { RequestContextService } from './request-context.service';

@Injectable()
export class GetConnectionService {
  private readonly cache = new Map<string, Repository<any>>();

  constructor(
    private readonly tenantConn: TenantConnectionService,
    protected readonly context: RequestContextService,
  ) {}

  async getRepository<T extends ObjectLiteral>(
    entity: EntityTarget<T>,
  ): Promise<Repository<T>> {
    const tenantId = this.context.getTenantId();
    if (!tenantId) {
      throw new BadRequestException('tenantId not found');
    }

    const key = this.getCacheKey(String(tenantId), entity);

    const cached = this.cache.get(key);
    if (cached) return cached;

    const conn = await this.tenantConn.getConnection(String(tenantId));
    if (!conn) {
      throw new Error(`Connection not found for tenant ${tenantId}`);
    }

    const repo = conn.getRepository(entity);

    this.cache.set(key, repo);
    return repo;
  }

  private getCacheKey<T>(
    tenantId: string,
    entity: EntityTarget<T>,
  ): string {
    if (typeof entity === 'function') return `${tenantId}_${entity.name}`;
    if (typeof entity === 'string') return `${tenantId}_${entity}`;
    return `${tenantId}_${JSON.stringify(entity)}`;
  }
}
