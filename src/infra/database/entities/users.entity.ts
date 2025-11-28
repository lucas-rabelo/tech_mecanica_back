import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
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

  @ManyToOne(() => TenantsEntity)
  @JoinColumn({ name: 'tenantId' })
  tenants: TenantsEntity;

  @Column()
  tenantId: number;
  
  @ManyToOne(() => PermissionsEntity, { nullable: true })
  @JoinColumn({ name: 'permissionId' })
  permissions: PermissionsEntity;
  
  @Column({ nullable: true })
  permissionId?: number;
  
  @ManyToOne(() => UserStatusEntity)
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
