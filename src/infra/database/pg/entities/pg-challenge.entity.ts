import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PgUserEntity } from '@/infra/database/pg/entities';

@Entity({ name: 'challenges' })
export class PgChallengeEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  status: string;
  @Column()
  challenged_id: string;
  @CreateDateColumn()
  request_date: Date;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => PgUserEntity, (user) => user.challenges)
  @JoinColumn({ name: 'user_id' })
  user?: PgUserEntity;
}
