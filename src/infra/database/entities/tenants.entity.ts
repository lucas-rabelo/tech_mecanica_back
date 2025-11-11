import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { TenantStatus } from './tenant-status.entity';

@Entity('tenants')
export class Tenants {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @OneToOne(() => TenantStatus)
  @JoinColumn()
  tenantStatusId: TenantStatus;

  @Column('varchar', { length: 255, unique: true })
  subdomain: string;

  @Column('timestamp')
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;

  @Column('timestamp', { nullable: true })
  deletedAt?: Date;
}
