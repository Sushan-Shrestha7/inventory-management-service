import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MoneyTransition } from './moneytransition';
@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  quantity: number;
  @Column({ nullable: true })
  price: number;
  @OneToMany(() => MoneyTransition, (transition) => transition.inventory)
  transitions: MoneyTransition[];
}
