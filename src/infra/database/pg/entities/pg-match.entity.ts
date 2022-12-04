import { PgChallengeEntity } from '@/infra/database/pg/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'matches' })
export class PgMatchEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  challenge_id: string;
  @Column()
  playWinner_id: string;
  @Column()
  playLoser_id: string;
  @Column()
  scoreWinner: number;
  @Column()
  scoreLoser: number;
  @Column()
  draw: boolean;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PgChallengeEntity, (challenge) => challenge.matches)
  @JoinColumn({ name: 'challenge_id' })
  challenge: PgChallengeEntity;
}
