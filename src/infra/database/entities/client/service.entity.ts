import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from './auditable.entity';
import { ServiceMaterialsEntity } from './service-material.entity';

@Entity('services')
export class ServicesEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number | null;

  @OneToMany(() => ServiceMaterialsEntity, (material) => material.service)
  materials: ServiceMaterialsEntity[];
}
