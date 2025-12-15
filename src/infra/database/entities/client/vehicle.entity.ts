import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomerEntity } from "./customer.entity";
import { AuditableEntity } from "./auditable.entity";

@Entity('vehicles')
export class VehiclesEntity extends AuditableEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, unique: true })
  licensePlate: string;

  @Column('varchar', { length: 255, unique: true })
  brand: string;

  @Column('varchar', { length: 255 })
  model: string;

  @Column('varchar', { length: 4 })
  year: string;
  
  @Column('varchar', { length: 255 })
  color: string;
  
  @Column('int')
  currentMileage: boolean;
  
  @ManyToOne(() => CustomerEntity, (customer) => customer.vehicles)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerEntity;

  @Column('int')
  customerId: number;
}