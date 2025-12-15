import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { VehiclesEntity } from "./vehicle.entity";
import { AuditableEntity } from "./auditable.entity";

@Entity('customers')
export class CustomerEntity extends AuditableEntity {
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
  
  @OneToMany(() => VehiclesEntity, (vehicle) => vehicle.customers)
  vehicles: VehiclesEntity[]
}