
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_status')
export class UserStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;
}