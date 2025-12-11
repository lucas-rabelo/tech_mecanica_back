// request-context.service.ts
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class RequestContextService {
  private static als = new AsyncLocalStorage<Map<string, any>>();

  run(context: Record<string, any>, callback: () => Promise<any>) {
    const store = new Map(Object.entries(context ?? {}));
    return RequestContextService.als.run(store, callback);
  }

  set(key: string, value: any) {
    const store = RequestContextService.als.getStore();
    store?.set(key, value);
  }

  get<T = any>(key: string): T | undefined {
    return RequestContextService.als.getStore()?.get(key);
  }

  getTenantId(): string | undefined {
    return this.get<string>('tenantId');
  }
}
