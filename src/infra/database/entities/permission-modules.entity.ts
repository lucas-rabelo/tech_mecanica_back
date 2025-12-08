import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PagesEntity } from './pages.entity';
import { PermissionsEntity } from './permissions.entity';
import { ModulesEntity } from './modules.entity';

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
  modules: PermissionsEntity;

  @Column({ type: 'int' })
  moduleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;

  @OneToMany(() => PagesEntity, (page) => page.id)
  pages: PagesEntity[];
}
