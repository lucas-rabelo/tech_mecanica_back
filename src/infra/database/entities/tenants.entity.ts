import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantStatusEntity } from './tenant-status.entity';

@Entity('tenants')
export class TenantsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @OneToOne(() => TenantStatusEntity)
  @JoinColumn({ name: 'tenantStatusId' })
  tenantStatus: TenantStatusEntity;
  
  tenantStatusId: number;

  @Column('varchar', { length: 255, unique: true })
  subdomain: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
