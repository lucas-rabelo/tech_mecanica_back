import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255, unique: true })
  email: string;

  @Column('varchar', { length: 14, unique: true })
  document: string;

  @Column('varchar', { length: 2 })
  customerType: string;
  
  @Column('varchar', { length: 14 })
  phone: string;
  
  @Column('boolean', { default: true })
  isWhatsapp: boolean;
  
  @Column('varchar', { length: 14, nullable: true })
  backupPhone: string | null;
  
  @Column('varchar', { length: 255, nullable: true })
  ownerBackupPhone: string | null;
  
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: null })
  updatedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, default: null })
  deletedAt: Date | null;
}