import { PgUserEntity } from '@/infra/database/pg/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ranking' })
export class PgRankingEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  user_id: string;
  @Column()
  points: number;
  @Column()
  event: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PgUserEntity, (user) => user.rankings)
  @JoinColumn({ name: 'user_id' })
  user: PgUserEntity;
}
