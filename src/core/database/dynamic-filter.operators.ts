import { SelectQueryBuilder, type ObjectLiteral } from 'typeorm';

export const DynamicOperators = {
  eq: <T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    param: string,
    value: any,
  ) => qb.andWhere(`${alias}.${field} = :${param}`, { [param]: value }),

  like: <T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    param: string,
    value: string,
  ) =>
    qb.andWhere(`${alias}.${field} LIKE :${param}`, {
      [param]: `%${value}%`,
    }),

  ilike: <T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    param: string,
    value: string,
  ) =>
    qb.andWhere(`${alias}.${field} ILIKE :${param}`, {
      [param]: `%${value}%`,
    }),

  in: <T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    param: string,
    value: any[],
  ) =>
    qb.andWhere(`${alias}.${field} IN (:...${param})`, {
      [param]: value,
    }),

  gte: <T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    param: string,
    value: any,
  ) =>
    qb.andWhere(`${alias}.${field} >= :${param}`, {
      [param]: value,
    }),

  lte: <T extends ObjectLiteral>(
    qb: SelectQueryBuilder<T>,
    alias: string,
    field: string,
    param: string,
    value: any,
  ) =>
    qb.andWhere(`${alias}.${field} <= :${param}`, {
      [param]: value,
    }),
};
