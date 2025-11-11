
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('permissions')
export class Permissions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('timestamp')
  createdAt: Date;

  @Column('timestamp', { nullable: true })
  updatedAt?: Date;

  @Column('timestamp', { nullable: true })
  deletedAt?: Date;
}