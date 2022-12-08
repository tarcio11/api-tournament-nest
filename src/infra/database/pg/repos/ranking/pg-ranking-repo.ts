import { RankingRepositoryAbstract, RankingResponse } from '@/domain/contracts/repos/ranking';
import { PgRepository } from '@/infra/database/pg/repos/repository';
import { Ranking } from '@/domain/entities';
import { Injectable } from '@nestjs/common';
import { PgRankingEntity } from '../../entities';

@Injectable()
export class PgRankingRepo extends PgRepository implements RankingRepositoryAbstract {
  async createMany(rankings: Ranking[]): Promise<void> {
    const pgMatchRepository = this.getRepository(PgRankingEntity);
    await pgMatchRepository.save(rankings);
  }

  async findAll(): Promise<RankingResponse[]> {
    const pgMatchRepository = this.getRepository(PgRankingEntity);
    return pgMatchRepository
      .createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.user', 'user')
      .groupBy('ranking.user_id')
      .addGroupBy('user.name')
      .addGroupBy('user.avatar')
      .select('SUM(ranking.points)', 'points')
      .addSelect('user.name', 'name')
      .addSelect('user.avatar', 'avatar')
      .addSelect('ranking.user_id', 'user_id')
      .orderBy('points', 'DESC')
      .getRawMany<RankingResponse>();
  }

  async add(ranking: Ranking): Promise<void> {
    const pgMatchRepository = this.getRepository(PgRankingEntity);
    await pgMatchRepository.save(ranking);
  }
}
