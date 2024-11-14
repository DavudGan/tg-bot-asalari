// rank.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('ranks')
export class Rank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: 1})
  title: string;

  @Column({ unique: true })
  level: number;

  @OneToMany(() => User, (user) => user.rank)
  users: User[];
}