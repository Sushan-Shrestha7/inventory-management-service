import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inventory } from './inventary';
import { User } from './user';
@Entity()
export class MoneyTransition {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  quantity: number;
  @Column()
  totalAmount: number;
  @Column()
  type: string;
  @Column()
  date: Date;
  @ManyToOne(() => User, (user) => user.transitions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Inventory, (inventory) => inventory.transitions)
  @JoinColumn({ name: 'inventoryId' })
  inventory: Inventory;
}
