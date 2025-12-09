import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PagesEntity } from './pages.entity';
import { PermissionsEntity } from './permissions.entity';

@Entity('permission_pages')
export class PermissionPagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PermissionsEntity)
  @JoinColumn({ name: 'permissionId' })
  permissions: PermissionsEntity;

  @Column({ type: 'int' })
  permissionId: number;

  @ManyToOne(() => PagesEntity)
  @JoinColumn({ name: 'pageId' })
  pages: PagesEntity;

  @Column({ type: 'int' })
  pageId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}
