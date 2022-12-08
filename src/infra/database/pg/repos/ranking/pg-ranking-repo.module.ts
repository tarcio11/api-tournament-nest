import { RankingRepositoryAbstract } from '@/domain/contracts/repos/ranking';
import { PgRankingRepo } from './pg-ranking-repo';

import { Module } from '@nestjs/common';

@Module({
  providers: [PgRankingRepo, { provide: RankingRepositoryAbstract, useExisting: PgRankingRepo }],
  exports: [RankingRepositoryAbstract],
})
export class PgRankingRepoModule {}
