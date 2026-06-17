import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from './session.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('float')
  duration: number;

  @Column()
  poster: string;

  @OneToMany(() => Session, (session) => session.film)
  sessions: Session[];
}
