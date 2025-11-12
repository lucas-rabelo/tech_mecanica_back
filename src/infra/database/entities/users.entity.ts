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
import { PermissionsEntity } from './permissions.entity';
import { TenantsEntity } from './tenants.entity';
import { UserStatusEntity } from './user-status.entity';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('date')
  birthDate: Date;

  @Column('varchar', { length: 20 })
  phone: string;

  @Column('text')
  password: string;

  @Column('varchar', { length: 20, unique: true })
  document: string;

  @OneToOne(() => TenantsEntity, (tenant) => tenant.id)
  @JoinColumn({ name: 'tenant_id' })
  tenantId: TenantsEntity;

  @OneToOne(() => PermissionsEntity, (permission) => permission.id)
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionsEntity;

  @OneToOne(() => UserStatusEntity, (tenant) => tenant.id)
  @JoinColumn({ name: 'user_status_id' })
  userStatus: UserStatusEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
