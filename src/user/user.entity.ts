// user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Rank } from '../rank/rank.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' }) 
  chatId: number;

  @Column({unique: true})
  name: string;

  @ManyToOne(() => Rank, { eager: true})
  @JoinColumn({ name: 'rankId' })
  rank: Rank;  
}