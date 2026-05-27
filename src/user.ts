import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MoneyTransition } from './moneytransition';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => MoneyTransition, (transition) => transition.user)
  transitions: MoneyTransition[];
}
