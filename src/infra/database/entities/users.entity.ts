import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserStatusEntity } from './user-status.entity';
import { UserTenantsEntity } from './user-tenants.entity';

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

  @OneToMany(() => UserTenantsEntity, (userTenant) => userTenant.user)
  userTenants: UserTenantsEntity[];
}
