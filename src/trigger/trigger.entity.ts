import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Response } from '../response/response.entity';

@Entity('trigger_phrases')
export class Trigger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phrase: string; 

  @OneToMany(() => Response, (response) => response.trigger)
  responses: Response[];
}