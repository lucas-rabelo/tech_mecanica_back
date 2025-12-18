import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "./auditable.entity";

@Entity('stock_items')
export class StockEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  sku: string;

  @Column('text')
  barcode: string;

  @Column('varchar', { length: 255 })
  unit: string;

  @Column('varchar', { length: 2 })
  location: string;
  
  @Column('int')
  minQuantity: number;
  
  @Column('int')
  currentQuantity: number;

  @Column('text')
  notes: string;

  @Column('boolean')
  isActive: boolean;
}