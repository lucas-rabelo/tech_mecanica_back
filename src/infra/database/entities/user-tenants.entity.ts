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
import { UsersEntity } from './users.entity';

@Entity('user_tenants')
export class UserTenantsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TenantsEntity, (tenant) => tenant.id)
  @JoinColumn({ name: 'tenantId' })
  tenant: TenantsEntity;

  @Column()
  tenantId: number;

  @ManyToOne(() => PermissionsEntity, (permission) => permission.id)
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionsEntity;

  @Column()
  permissionId: number;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UsersEntity;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
