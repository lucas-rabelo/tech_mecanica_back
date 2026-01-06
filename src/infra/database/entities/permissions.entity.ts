import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UsersEntity } from './users.entity';
import { PermissionModulesEntity } from './permission-modules.entity';
import { PermissionPagesEntity } from './permission-pages.entity';
import { UserTenantsEntity } from './user-tenants.entity';

@Entity('permissions')
export class PermissionsEntity {
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

  @OneToMany(() => UserTenantsEntity, (userTenant) => userTenant.permission)
  userTenants: UserTenantsEntity[];

  @OneToMany(() => PermissionModulesEntity, (permissionModule) => permissionModule.permissions)
  permissionModules: PermissionModulesEntity[];

  @OneToMany(() => PermissionPagesEntity, (permissionPage) => permissionPage.permissions)
  permissionPages: PermissionPagesEntity[];
}
