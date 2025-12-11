import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TenantConnectionService {
  private connections = new Map<string, DataSource>();

  getTenantDbConfig(tenantId: string) {
    const get = (k: string) => process.env[k];
    return {
      host: get(`TENANT_${tenantId}_DB_HOST`),
      port: get(`TENANT_${tenantId}_DB_PORT`),
      username: get(`TENANT_${tenantId}_DB_USER`),
      password: get(`TENANT_${tenantId}_DB_PASS`),
      database: get(`TENANT_${tenantId}_DB_NAME`),
      synchronize: get(`TENANT_${tenantId}_DB_SYNCHRONIZE`) === 'true',
    };
  }

  async getConnection(tenantId: string) {
    if (this.connections.has(tenantId)) {
      return this.connections.get(tenantId);
    }
    const cfg = this.getTenantDbConfig(tenantId);
    if (!cfg.host) throw new Error(`No config for tenant ${tenantId}`);
    const ds = new DataSource({
      type: 'postgres',
      host: cfg.host,
      port: Number(cfg.port),
      username: cfg.username,
      password: cfg.password,
      database: cfg.database,
      synchronize: cfg.synchronize,
      entities: ['dist/src/infra/database/entities/client/**/*.entity.{ts,js}'],
      migrations: ['dist/src/infra/database/migrations/client/**/*.{ts,js}'],
    });
    await ds.initialize();
    this.connections.set(tenantId, ds);
    return ds;
  }
}
