
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tenant_status')
export class TenantStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;
}