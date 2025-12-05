import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
}
