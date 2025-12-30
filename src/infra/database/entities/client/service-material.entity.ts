import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { ServicesEntity } from './service.entity';
import { StockEntity } from './stock.entity';

@Entity('service_materials')
export class ServiceMaterialsEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ServicesEntity, (service) => service.materials, { onDelete: 'CASCADE' })
  service: ServicesEntity;

  @Column()
  serviceId: number;

  @ManyToOne(() => StockEntity, (stock) => stock.serviceMaterials, { onDelete: 'CASCADE' })
  stock: StockEntity;

  @Column()
  stockId: number;

  @Column('int')
  quantity: number;
}
