import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => TenantsEntity, (tenant) => tenant.id, { nullable: true })
  @JoinColumn({ name: 'tenantId' })
  tenant?: TenantsEntity;

  @Column({ nullable: true })
  tenantId?: number;

  @ManyToOne(() => PermissionsEntity, (permission) => permission.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionsEntity;

  @Column({ nullable: true })
  permissionId?: number;

  @ManyToOne(() => UserStatusEntity, (userStatus) => userStatus.id)
  @JoinColumn({ name: 'userStatusId' })
  userStatus: UserStatusEntity;

  @Column()
  userStatusId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
