import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export abstract class AuditableEntity {
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  createdBy?: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  updatedBy?: number;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ nullable: true })
  deletedBy?: number;
}
