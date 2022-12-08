import { PgChallengeEntity, PgRankingEntity } from '@/infra/database/pg/entities';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class PgUserEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  avatar: string;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => PgChallengeEntity, (challenge) => challenge.user, { cascade: true })
  challenges: PgChallengeEntity[];

  @OneToMany(() => PgRankingEntity, (ranking) => ranking.user, { cascade: true })
  rankings: PgRankingEntity[];
}
