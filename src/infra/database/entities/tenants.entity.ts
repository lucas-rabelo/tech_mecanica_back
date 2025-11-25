import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TenantStatusEntity } from './tenant-status.entity';
import { UsersEntity } from './users.entity';

@Entity('tenants')
export class TenantsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @ManyToOne(() => TenantStatusEntity)
  @JoinColumn({ name: 'tenantStatusId' })
  tenantStatus: TenantStatusEntity;

  @Column()
  tenantStatusId: number;

  @Column('varchar', { length: 255, unique: true })
  subdomain: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;

  @OneToMany(() => UsersEntity, (user) => user.id)
  users: UsersEntity[];
}
