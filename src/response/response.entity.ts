import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trigger } from '../trigger/trigger.entity';

@Entity('responses')
export class Response {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  response: string; 

  @ManyToOne(() => Trigger, (trigger) => trigger.responses)
  trigger: Trigger;
}