import { SelectQueryBuilder, type ObjectLiteral } from 'typeorm';
import { isValidFilterValue } from '../utils';
import { DynamicOperators } from './dynamic-filter.operators';
import { DynamicFilterInput, DynamicFilterMap } from './dynamic-filter.types';

export class DynamicFilterBuilder {
  static apply<TEntity extends ObjectLiteral>(
    qb: SelectQueryBuilder<TEntity>,
    filters: DynamicFilterInput,
    config: DynamicFilterMap<TEntity>,
    alias = 'e',
  ) {
    if (!filters) return;

    Object.entries(filters).forEach(([key, value]) => {
      if (!isValidFilterValue(value)) return;

      const filterConfig = config[key];
      if (!filterConfig) return; // whitelist

      const { field, operator, transform } = filterConfig;

      const finalValue = transform ? transform(value) : value;

      const param = `${key}`;

      const op = DynamicOperators[operator];
      if (!op) return;

      op(qb, alias, field as string, param, finalValue);
    });
  }
}
