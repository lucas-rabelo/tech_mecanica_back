import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModulesEntity } from './modules.entity';
import { PermissionsEntity } from './permissions.entity';

@Entity('permission_modules')
export class PermissionModulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PermissionsEntity)
  @JoinColumn({ name: 'permissionId' })
  permissions: PermissionsEntity;

  @Column({ type: 'int' })
  permissionId: number;

  @ManyToOne(() => ModulesEntity)
  @JoinColumn({ name: 'moduleId' })
  modules: ModulesEntity;

  @Column({ type: 'int' })
  moduleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
