export type FilterOperator =
  | 'eq'
  | 'like'
  | 'ilike'
  | 'in'
  | 'gte'
  | 'lte';

export interface DynamicFilterInput {
  [key: string]: any;
}

export interface DynamicFilterConfig<TEntity> {
  field: keyof TEntity;
  operator: FilterOperator;
  transform?: (value: any) => any;
}

export type DynamicFilterMap<TEntity> = Record<
  string,
  DynamicFilterConfig<TEntity>
>;
