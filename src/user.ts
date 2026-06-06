import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MoneyTransition } from './moneytransition';
import { Role } from './role.enum';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'The unique identifier for the user' })
  id: number;
  @Column()
  @ApiProperty({ description: 'The name of the user' })
  name: string;
  @Column()
  @ApiProperty({ description: 'The email address of the user' })
  email: string;
  @Column()
  @ApiProperty({ description: 'The password of the user' })
  password: string;
  @Column({ nullable: true })
  DOB: Date;
  @Column({ type: 'enum', enum: Role, default: Role.Viewer })
  @ApiProperty({
    description: 'The role of the user',
    enum: Role,
    default: Role.Viewer,
  })
  role: Role;
  @OneToMany(() => MoneyTransition, (transition) => transition.user)
  transitions: MoneyTransition[];
}
