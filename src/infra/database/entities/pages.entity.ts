import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModulesEntity } from './modules.entity';
import { PermissionPagesEntity } from './permission-pages.entity';

@Entity('pages')
export class PagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @ManyToOne(() => ModulesEntity)
  @JoinColumn({ name: 'moduleId' })
  modules: ModulesEntity;

  @Column()
  moduleId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;

  @OneToMany(() => PermissionPagesEntity, (permissionPage) => permissionPage.pages)
  permissionPages: PermissionPagesEntity[];
}
