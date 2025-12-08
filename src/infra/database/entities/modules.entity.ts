import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PagesEntity } from './pages.entity';
import { PermissionModulesEntity } from './permission-modules.entity';

@Entity('modules')
export class ModulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;

  @OneToMany(() => PagesEntity, (page) => page.id)
  pages: PagesEntity[];

  @OneToMany(() => PermissionModulesEntity, (permissionModule) => permissionModule.id)
  permissionModules: PermissionModulesEntity[];
}
