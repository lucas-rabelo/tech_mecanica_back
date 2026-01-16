import {
  InventoryMovementReason,
  type InventoryMovementReasonEnum,
  InventoryMovementReferenceType,
  type InventoryMovementReferenceTypeEnum,
  InventoryMovementType,
  type InventoryMovementTypeEnum,
} from '@/src/core';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { StockEntity } from './stock.entity';

@Entity('inventory_movement')
export class InventoryMovementEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StockEntity, (stockItem) => stockItem.inventoryMovements)
  @JoinColumn({ name: 'stockItemId' })
  stockItems: StockEntity;

  @Column()
  stockItemId: number;

  @Column('enum', { enum: InventoryMovementType })
  type: InventoryMovementTypeEnum;

  @Column('int')
  quantity: number;

  @Column('int')
  balanceAfter: number;

  @Column('enum', { enum: InventoryMovementReason })
  reason: InventoryMovementReasonEnum;

  @Column('text')
  description: string;

  @Column('enum', { enum: InventoryMovementReferenceType })
  referenceType: InventoryMovementReferenceTypeEnum;

  // @ManyToOne(() => OrderServiceEntity, (orderService) => oderService.inventoryMovements)
  // JoinColumn({ name: 'orderServiceId' })

  // @Column('int')
  // orderServiceId: number;
}
